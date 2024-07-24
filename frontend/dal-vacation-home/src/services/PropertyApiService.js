import axios from "axios";
import { SAVE_FEEDBACK_URL } from "../util/ApiConstants";


const API_BASE_URL = 'https://vrnylsjiye.execute-api.us-east-1.amazonaws.com/prod/property'; 

export const getPropertiesByRole = async (role) => {
    try{
      const endpoint = role === 'agent'
        ? 'https://vrnylsjiye.execute-api.us-east-1.amazonaws.com/prod/'
        : `${API_BASE_URL}`;
        console.log(endpoint,role);
    //   const response = await axios.get(endpoint);
    const response = {
        "data": {
            "Count": 3,
            "Items": [
                {
                    "agentPool": {
                        "S": "['tom.brown@example.com', 'john.doe@example.com']"
                    },
                    "propertyId": {
                        "S": "P2"
                    },
                    "roomType": {
                        "S": "1 Bedroom"
                    },
                    "roomNumber": {
                        "N": "102"
                    },
                    "occupancy": {
                        "N": "2"
                    },
                    "ownerId": {
                        "S": "tom.brown@example.com"
                    },
                    "features": {
                        "S": "['Heater', 'Wi-Fi', 'TV]"
                    }
                },
                {
                    "agentPool": {
                        "S": "['tom.brown@example.com', 'john.doe@example.com']"
                    },
                    "propertyId": {
                        "S": "P5"
                    },
                    "roomType": {
                        "S": "2 Bedroom"
                    },
                    "roomNumber": {
                        "N": "105"
                    },
                    "occupancy": {
                        "N": "4"
                    },
                    "ownerId": {
                        "S": "tom.brown@example.com"
                    },
                    "features": {
                        "S": "['Heater', 'Wi-Fi', 'TV']"
                    }
                },
                {
                    "agentPool": {
                        "S": "['tom.brown@example.com', 'john.doe@example.com']"
                    },
                    "propertyId": {
                        "S": "P4"
                    },
                    "roomType": {
                        "S": "2 Bedroom"
                    },
                    "roomNumber": {
                        "N": "103"
                    },
                    "occupancy": {
                        "N": "4"
                    },
                    "ownerId": {
                        "S": "tom.brown@example.com"
                    },
                    "features": {
                        "S": "['Heater', 'Wi-Fi', 'TV']"
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
            "url": "https://vrnylsjiye.execute-api.us-east-1.amazonaws.com/prod/property"
        },
        "request": {}
    }
      console.log("Response from the API:",response)  
      if(role === "student"){
            
            const propertiesData = response.data.Items;
            // const propertiesData = response.Items;
            const transformedProperties = propertiesData.map(property => ({
            agentPool: property.agentPool.S,
            propertyId: property.propertyId.S,
            roomType: property.roomType.S,
            roomNumber: property.roomNumber.N,
            occupancy: property.occupancy.N,
            ownerId: property.ownerId.S,
            features: property.features.S,
        }));
        console.log('Transformed Properties:', transformedProperties);
        console.log("Transformed Properties type:",typeof(transformedProperties));
      return transformedProperties;

        }
        if(role==='agent'){
            console.log("Reached If role agent")
            const response = {
                "Count": 1,
                "Items": [
                    {
                        "bookingReferenceNumber": {
                            "S": "ab554a6b-e410-40e2-a7e1-693198089eea"
                        },
                        "isApproved": {
                            "BOOL": false
                        },
                        "propertyId": {
                            "S": "P2"
                        },
                        "fromDate": {
                            "S": "2024-07-01"
                        },
                        "userId": {
                            "S": "john.smith@example.com"
                        },
                        "roomNumber": {
                            "N": "102"
                        },
                        "creationDate": {
                            "S": "2024-06-25"
                        },
                        "agentId": {
                            "S": "tom.brown@example.com"
                        },
                        "toDate": {
                            "S": "2024-12-31"
                        }
                    },
                    {
                        "bookingReferenceNumber": {
                            "S": "cd554a6b-e410-40e2-a7e1-693198089eea"
                        },
                        "isApproved": {
                            "BOOL": false
                        },
                        "propertyId": {
                            "S": "P2"
                        },
                        "fromDate": {
                            "S": "2024-07-01"
                        },
                        "userId": {
                            "S": "john.doe@example.com"
                        },
                        "roomNumber": {
                            "N": "103"
                        },
                        "creationDate": {
                            "S": "2024-06-25"
                        },
                        "agentId": {
                            "S": "tom.brown@example.com"
                        },
                        "toDate": {
                            "S": "2024-12-31"
                        }
                    }
                    
                ],
                "ScannedCount": 1
            };
            console.log(response.Items)
            //Use it once you setup the API:const approvalData = response.data.Items;
            const approvalData = response.Items;
            const transformedApprovals2 = approvalData.map(approval=>{ 
                console.log("Processing approval:", approval,approval.bookingReferenceNumber.S);
                return {
                  bookingReferenceNo: approval.bookingReferenceNumber.S,
                  propertyId: approval.propertyId.S,
                  roomNumber: approval.roomNumber.N,
                  studentEmail: approval.userId.S,
                  fromDate: approval.fromDate.S,
                  toDate: approval.toDate.S,
                  isApproved: approval.isApproved.N,
                  agentId: approval.agentId.S,
                  createdDate: approval.creationDate.S
                };
            })
            console.log("Transformed approvals2",transformedApprovals2)
            const transformedApprovals = approvalData.map(approval => ({
                bookingReferenceNumber: approval.bookingReferenceNumber?.S || '',
                propertyId: approval.propertyId?.S || '',
                roomNumber: approval.roomNumber?.N || -1 ,
                userId: approval.userId?.S || '',
                fromDate: approval.fromDate?.S || '',
                toDate: approval.toDate?.S || '',
                isApproved: approval.isApproved?.N || -1,
                agentId: approval.agentId?.S || '',
                creationDate: approval.creationDate?.S || ''
            }));
            console.log('Transformed Approval data:', transformedApprovals);
            console.log("Transformed Approval Properties type:",typeof(transformedApprovals));
          return transformedApprovals;
        }
        
    }
    catch(error){
        console.log("Something went wrong while fetching data:",error);
        return null;
    }   
    }
  
  


// export const fetchAllProperties = async () => {
//     try {
//         // const response = await fetch(`${API_BASE_URL}`, {
//         //     method: 'GET',
//         //     headers: {
//         //         'Content-Type': 'application/json'   
//         //     },
//         // });
        
//         const response = await axios.get(`${API_BASE_URL}`)
//         const propertiesData = response.data.Items;
//         const transformedProperties = propertiesData.map(property => ({
//             agentPool: property.agentPool.S,
//             propertyId: property.propertyId.S,
//             roomType: property.roomType.S,
//             roomNumber: property.roomNumber.N,
//             occupancy: property.occupancy.N,
//             ownerId: property.ownerId.S,
//             features: property.features.S,
//         }));

//         console.log('Transformed Properties:', transformedProperties);
//         console.log("Transformed Properties type:",typeof(transformedProperties));
//         /*
//         response.data: {
//     "Count": 2,
//     "Items": [
//         {
//             "agentPool": {
//                 "S": ""
//             },
//             "propertyId": {
//                 "S": "P112"
//             },
//             "roomType": {
//                 "S": "2 Bedroom"
//             },
//             "roomNumber": {
//                 "N": "112"
//             },
//             "occupancy": {
//                 "N": "4"
//             },
//             "ownerId": {
//                 "S": ""
//             },
//             "features": {
//                 "S": "Heater,TV,Wi-fi"
//             }
//         },
//         {
//             "agentPool": {
//                 "S": "['tom.brown@example.com', 'john.doe@example.com']"
//             },
//             "propertyId": {
//                 "S": "P3"
//             },
//             "roomType": {
//                 "S": "1 Bedroom"
//             },
//             "roomNumber": {
//                 "N": "102"
//             },
//             "occupancy": {
//                 "N": "2"
//             },
//             "ownerId": {
//                 "S": "tom.brown@example.com"
//             },
//             "features": {
//                 "S": "['Heater', 'Wi-Fi', 'TV]"
//             }
//         }
//     ],
//     "ScannedCount": 2
// }
//         response.data.Items: [
//     {
//         "agentPool": {
//             "S": ""
//         },
//         "propertyId": {
//             "S": "P112"
//         },
//         "roomType": {
//             "S": "2 Bedroom"
//         },
//         "roomNumber": {
//             "N": "112"
//         },
//         "occupancy": {
//             "N": "4"
//         },
//         "ownerId": {
//             "S": ""
//         },
//         "features": {
//             "S": "Heater,TV,Wi-fi"
//         }
//     },
//     {
//         "agentPool": {
//             "S": "['tom.brown@example.com', 'john.doe@example.com']"
//         },
//         "propertyId": {
//             "S": "P3"
//         },
//         "roomType": {
//             "S": "1 Bedroom"
//         },
//         "roomNumber": {
//             "N": "102"
//         },
//         "occupancy": {
//             "N": "2"
//         },
//         "ownerId": {
//             "S": "tom.brown@example.com"
//         },
//         "features": {
//             "S": "['Heater', 'Wi-Fi', 'TV]"
//         }
//     }
// ]

//         */

//         // if (!response.ok) {
//         //     throw new Error('Network response was not ok');
//         // }

//         // const properties = await response.json();
//         // console.log(typeof(properties),properties)
//         return transformedProperties;
//     } catch (error) {
//         console.error('Failed to fetch properties:', error);
//         return [];
//     }
// };

// export const fetchPropertyData = async (propertyId) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add any necessary headers, like Authorization
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const propertyData = await response.json();
//         return propertyData;
//     } catch (error) {
//         console.error(`Failed to fetch property with ID ${propertyId}:`, error);
//         return null;
//     }
// };

// const response = {
//     "Count": 1,
//     "Items": [
//         {
//             "agentPool": {
//                 "S": "['tom.brown@example.com', 'john.doe@example.com']"
//             },
//             "propertyId": {
//                 "S": "P2"
//             },
//             "roomType": {
//                 "S": "1 Bedroom"
//             },
//             "roomNumber": {
//                 "N": "102"
//             },
//             "occupancy": {
//                 "N": "2"
//             },
//             "ownerId": {
//                 "S": "tom.brown@example.com"
//             },
//             "features": {
//                 "S": "['Heater', 'Wi-Fi', 'TV]"
//             }
//         }
//     ],
//     "ScannedCount": 1
// };