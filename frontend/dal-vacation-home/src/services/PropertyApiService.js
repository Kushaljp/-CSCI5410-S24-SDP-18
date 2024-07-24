import axios from "axios";
import { SAVE_FEEDBACK_URL } from "../util/ApiConstants";


const API_BASE_URL = 'https://kiuy4j7k8h.execute-api.us-east-1.amazonaws.com/prod/property'; 

export const fetchAllProperties = async () => {
    try {
        // const response = await fetch(`${API_BASE_URL}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'   
        //     },
        // });
        
        const response = await axios.get(`${API_BASE_URL}`)
        const propertiesData = response.data.Items;
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
        /*
        response.data: {
    "Count": 2,
    "Items": [
        {
            "agentPool": {
                "S": ""
            },
            "propertyId": {
                "S": "P112"
            },
            "roomType": {
                "S": "2 Bedroom"
            },
            "roomNumber": {
                "N": "112"
            },
            "occupancy": {
                "N": "4"
            },
            "ownerId": {
                "S": ""
            },
            "features": {
                "S": "Heater,TV,Wi-fi"
            }
        },
        {
            "agentPool": {
                "S": "['tom.brown@example.com', 'john.doe@example.com']"
            },
            "propertyId": {
                "S": "P3"
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
        }
    ],
    "ScannedCount": 2
}
        response.data.Items: [
    {
        "agentPool": {
            "S": ""
        },
        "propertyId": {
            "S": "P112"
        },
        "roomType": {
            "S": "2 Bedroom"
        },
        "roomNumber": {
            "N": "112"
        },
        "occupancy": {
            "N": "4"
        },
        "ownerId": {
            "S": ""
        },
        "features": {
            "S": "Heater,TV,Wi-fi"
        }
    },
    {
        "agentPool": {
            "S": "['tom.brown@example.com', 'john.doe@example.com']"
        },
        "propertyId": {
            "S": "P3"
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
    }
]

        */

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // const properties = await response.json();
        // console.log(typeof(properties),properties)
        return transformedProperties;
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        return [];
    }
};

export const fetchPropertyData = async (propertyId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any necessary headers, like Authorization
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const propertyData = await response.json();
        return propertyData;
    } catch (error) {
        console.error(`Failed to fetch property with ID ${propertyId}:`, error);
        return null;
    }
};


export const saveFeedback = async (data, navigate) => {   
    const currentDate = new Date();
    data.date = currentDate.toLocaleDateString();
    data.reviewId = "R" + currentDate.getTime();
    data.rating = Number(data.rating)
    data.roomNumber = Number(data.roomNumber)
    try {
        await axios.post(SAVE_FEEDBACK_URL, data);
        navigate("/login")
      } catch (error) {}
}