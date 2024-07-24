import json
import boto3
import uuid


def lambda_handler(event, context):
    try:
        print("Approve Booking...")
        dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
        booking_table = dynamodb.Table('Booking')
        booking_reference_number = event['booking_reference']
        booking_update_response = booking_table.update_item(Key={'bookingReferenceNumber': booking_reference_number},
                                                                    UpdateExpression='SET IsApproved = :IsApproved',
                                                                    ExpressionAttributeValues={
                                                                    ':IsApproved': 1
                                                                    },ReturnValues='UPDATED_NEW')
        return {
            "statusCode":200,
            "headers": {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*"
        },
            "body": json.dumps({"bookingReferenceId": booking_reference_number}) }
    except Exception as ex:
        print("Error while approving the booking:",ex)