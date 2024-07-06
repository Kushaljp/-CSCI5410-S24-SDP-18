import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const PropertyCard = ({property}) => {

    const cleanString = (str) => {
        console.log('String:',str.replace(/[\[\]\']+/g,"").trim(),typeof(str));
        return str.replace(/[\[\]\']+/g,'').trim();
    }

    console.log("Property Card page data:",property);
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">Room {property.roomNumber}</Typography>
                <Typography variant="body2">Features: {cleanString(property.features)}</Typography>
                <Typography variant="body2">Occupancy: {property.occupancy}</Typography>
                <Typography variant="body2">Room Type: {property.roomType}</Typography>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
