import functions_framework
import requests
from google.cloud import bigquery
from google.cloud import language_v1

@functions_framework.http
def fetch_and_load_data(request):
    """
    HTTP Cloud Function to fetch data from APIs and load into BigQuery.
    """

    # Initialize BigQuery client
    client = bigquery.Client()

    # Initialize Natural Language API client
    language_client = language_v1.LanguageServiceClient()

    # Define BigQuery dataset and table names
    project_id = 'csci-5408-data-management'
    dataset_id = 'DalVacationHome_Looker_Data'
    user_table_id = 'User'
    feedback_table_id = 'Feedback'

    # Define API endpoints for fetching data
    user_api_url = 'https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/getData?table_name=User'
    review_api_url = 'https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/getData?table_name=Review'
    
    try:
        # Fetch data from User API
        response_user = requests.get(user_api_url)
        response_user.raise_for_status()
        data_user = response_user.json()
        
        # Check if response contains data
        if 'body' not in data_user:
            return {'error': 'No data in response from User API'}, 500
        
        # Extract user data from API response body
        users = data_user['body']
        
        # Fetch existing User records from BigQuery
        query_user = f"SELECT * FROM `{project_id}.{dataset_id}.{user_table_id}`"
        existing_users = [dict(row) for row in client.query(query_user).result()]
        
        # Function to compare two user records excluding 'LoggedIn' attribute
        def is_same_user(user1, user2):
            return (
                user1['UserName'] == user2['UserName'] and
                user1['CaesarCipher'] == user2['CaesarCipher'] and
                user1['Email'] == user2['Email'] and
                user1['FirstName'] == user2['FirstName'] and
                user1['LastName'] == user2['LastName'] and
                user1['Questions'] == user2['Questions'] and
                user1['Role'] == user2['Role']
            )

        # Prepare data for insertion into User table in BigQuery, excluding existing records
        rows_to_insert_user = [
            {
                'UserName': user['UserName'],
                'CaesarCipher': user['CaesarCipher'],
                'Email': user['Email'],
                'FirstName': user['FirstName'],
                'LastName': user['LastName'],
                'Questions': user['Questions'],
                'Role': user['Role'],
                'LoggedIn': user.get('LoggedIn', '0')  # Handle cases where 'LoggedIn' may not be present
            }
            for user in users
            if not any(is_same_user(user, existing_user) for existing_user in existing_users)
        ]

        # Insert new User records into BigQuery
        if rows_to_insert_user:
            table_ref_user = client.dataset(dataset_id).table(user_table_id)
            errors_user = client.insert_rows_json(table_ref_user, rows_to_insert_user)
            if errors_user:
                return {'error': f"Error inserting rows into User table: {errors_user}"}, 500

        # Fetch data from Review API
        response_review = requests.get(review_api_url)
        response_review.raise_for_status()
        data_review = response_review.json()
        
        # Check if response contains data
        if 'body' not in data_review:
            return {'error': 'No data in response from Review API'}, 500
        
        # Extract review data from API response body
        reviews = data_review['body']
        
        # Fetch existing Feedback records from BigQuery
        query_feedback = f"SELECT * FROM `{project_id}.{dataset_id}.{feedback_table_id}`"
        existing_feedbacks = [dict(row) for row in client.query(query_feedback).result()]

        # Function to compare two feedback records
        def is_same_feedback(feedback1, feedback2):
            return (
                str(feedback1['ReviewId']) == str(feedback2['ReviewId']) and
                str(feedback1['Date']) == str(feedback2['Date']) and
                str(feedback1['Rating']) == str(feedback2['Rating']) and
                str(feedback1['RoomId']) == str(feedback2['RoomId']) and
                str(feedback1['UserId']) == str(feedback2['UserId']) and
                str(feedback1['Review']) == str(feedback2['Review'])
            )

        # Function to determine sentiment category based on sentiment score
        def get_sentiment_category(score):
            if score >= 0.25:
                return 'positive'
            elif score <= -0.25:
                return 'negative'
            else:
                return 'neutral'

        # Prepare data for insertion into Feedback table in BigQuery, excluding existing records
        rows_to_insert_feedback = []
        for review in reviews:
            # Check if feedback already exists in BigQuery
            if any(is_same_feedback(review, existing_feedback) for existing_feedback in existing_feedbacks):
                continue

            # Perform sentiment analysis using Natural Language API
            document = language_v1.Document(content=review['Review'], type_=language_v1.Document.Type.PLAIN_TEXT)
            sentiment = language_client.analyze_sentiment(request={'document': document}).document_sentiment

            # Append formatted feedback data to list for insertion
            rows_to_insert_feedback.append({
                'ReviewId': review['ReviewId'],
                'Date': review['Date'],
                'Rating': review['Rating'],
                'RoomId': review['RoomId'],
                'UserId': review['UserId'],
                'Review': review['Review'],
                'SentimentScore': sentiment.score,
                'SentimentMagnitude': sentiment.magnitude,
                'SentimentCategory': get_sentiment_category(sentiment.score)
            })

        # Insert new Feedback records into BigQuery if there are records to insert
        if rows_to_insert_feedback:
            table_ref_feedback = client.dataset(dataset_id).table(feedback_table_id)
            errors_feedback = client.insert_rows_json(table_ref_feedback, rows_to_insert_feedback)
            if errors_feedback:
                return {'error': f"Error inserting rows into Feedback table: {errors_feedback}"}, 500
        
        # Return success message if data is successfully loaded
        return {'message': 'Data loaded successfully.'}, 200
    
    # Handle HTTP request exceptions
    except requests.exceptions.RequestException as e:
        return {'error': f"Error fetching data: {str(e)}"}, 500
    
    # Handle unexpected errors
    except Exception as e:
        return {'error': f"Error: {str(e)}"}, 500
