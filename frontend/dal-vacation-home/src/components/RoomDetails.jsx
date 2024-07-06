import PropertyCard from "./PropertyCard";
import  { useState} from 'react';
import {Box,Typography} from '@mui/material';


 const RoomDetails = () => {
    const [property, setProperty] = useState({
        "agentPool": "['tom.brown@example.com', 'john.doe@example.com']",
        "propertyId": "P3",
        "roomType": "1 Bedroom",
        "roomNumber": "102",
        "occupancy": "2",
        "ownerId": "tom.brown@example.com",
        "features": "['Heater', 'Wi-Fi', 'TV']"
    });

    const cleanString = (str) => {
        console.log('String:',str.replace(/[\[\]\']+/g,"").trim(),typeof(str));
        return str.replace(/[\[\]\']+/g,'').trim();
    }

    return (
        <>
        <Box sx={{ width: '400px', margin: 'auto' }}>
        <Typography variant="h6">Room {property.roomNumber}</Typography>
        <Typography variant="body2">Features: {cleanString(property.features)}</Typography>
        <Typography variant="body2">Occupancy: {property.occupancy}</Typography>
        <Typography variant="body2">Room Type: {property.roomType}</Typography>
        </Box>
        </>
    );
    

};

export default RoomDetails;