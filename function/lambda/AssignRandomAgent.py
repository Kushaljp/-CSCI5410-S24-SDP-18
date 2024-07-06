import json
import boto3
import random
import datetime
def lambda_handler(event,context):
    try:
        dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
        property_table = dynamodb.Table('Property')
        booking_table = dynamodb.Table('Booking')
        for record in event['Records']:
            rec = json.loads(record['body']) 
            print(rec,record)
            property_id = rec['PropertyId']
            booking_reference_number = rec['BookingReferenceNo']
            response = property_table.get_item(Key={'PropertyId': property_id})
            property_data = response['Item']
            agent_pool_str = property_data.get('AgentPool', '')
            agent_pool = agent_pool_str.split(',') if agent_pool_str else []
            selected_agent = random.choice(agent_pool)
            created_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            booking_update_response = booking_table.update_item( Key={'BookingReferenceNo': booking_reference_number},
                                                                UpdateExpression='SET AgentId = :agentId, CreatedDate = :createdDate',
                                                                ExpressionAttributeValues={
                                                                ':agentId': selected_agent,
                                                                ':createdDate': created_date},ReturnValues='UPDATED_NEW')
    except Exception as ex:
        print("Error while assigning random agent:",ex)
        raise ex
    # return {"statusCode":200,
    #         "body":""}