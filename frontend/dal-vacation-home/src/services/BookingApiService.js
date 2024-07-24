export const getBookingByUser = async (user) => {
try {
const endpoint = 'https://vrnylsjiye.execute-api.us-east-1.amazonaws.com/prod/'  ;
const response = {
    "data": {
        "Count": 3,
        "Items": [
            {
                "bookingReferenceNumber": {
                    "S": "b53bc608-122a-466a-bdb2-6a953863668d"
                },
                "userId": {
                    "S": "john.doe@example.com"
                }
            },
            {
                "bookingReferenceNumber": {
                    "S": "ab554a6b-e410-40e2-a7e1-693198089eea"
                },
                "userId": {
                    "S": "john.doe@example.com"
                }
            },
            {
                "bookingReferenceNumber": {
                    "S": "ca754a6b-e410-40e2-a7e1-693198089efd"
                },
                "userId": {
                    "S": "john.doe@example.com"
                }
            }
        ],
        "ScannedCount": 3
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "content-length": "806",
        "content-type": "application/json"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://example.com/api/booking-reference-numbers"
    },
    "request": {}
};
const bookingData = response.data.Items;
    // propertyId: approval.propertyId?.S || '',
    // roomNumber: approval.roomNumber?.N || -1 ,
    // fromDate: approval.fromDate?.S || '',
    // toDate: approval.toDate?.S || '',
    // isApproved: approval.isApproved?.N || -1,
    // agentId: approval.agentId?.S || '',
    // creationDate: approval.creationDate?.S || ''
    const transformedBooking = bookingData.map(booking => ({
    bookingReferenceNumber: booking.bookingReferenceNumber?.S || '',
    userId: booking.userId?.S || ''
}));
    return transformedBooking;
}
catch(error){
    console.log("Something went wrong while fetching booking data:",error);
    return null;
}
}