import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropertyCard from './PropertyCard_old'; 
import { fetchAllProperties, fetchPropertyData } from '../services/PropertyApiService'; 
import EditProperty from './EditProperty'; 

export const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    
    useEffect(() => {
        const propertiesData = fetchAllProperties();
        console.log(typeof(propertiesData))
        console.log("Properties Data:",propertiesData);
        setProperties(propertiesData);
    }, []);

    const handleEditClick = (propertyId) => {
        setSelectedPropertyId(propertyId);
    };

    return (
        <Box sx={{ width: '400px', margin: 'auto' }}>
            <Typography variant='h5'>Properties</Typography>
            {properties.map(property => (
                <PropertyCard key={property.roomNumber} property={property} onEdit={handleEditClick} />
            ))}
            {selectedPropertyId && <EditProperty propertyId={selectedPropertyId} />}
        </Box>
    );
};

export default PropertyList;
