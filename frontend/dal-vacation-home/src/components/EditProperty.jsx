import { TextField, Typography, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../util/user-authentication/AuthenticationUtil';
import { fetchPropertyData } from '../services/PropertyApiService'; 

const EditProperty = ({ propertyId }) => {
    const [data, setData] = useState({ propertyId:"P112",ownerId: '', features: '', occupancy: '', roomNumber: '112', roomType: '2 Bedroom' });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
        
        const propertyData = fetchPropertyData(propertyId);
        if (propertyData) {
            setData(propertyData);
        }
    }, [propertyId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const editProperty = () => {
        console.log(user);
        console.log(data);
        // Add your property update logic here
    };

    return (
        <Box sx={{ width: '400px', margin: 'auto', mt: 4 }}>
            <Typography variant='h5'>Edit Property</Typography>
            <TextField
                label="Enter Features"
                fullWidth
                margin="normal"
                name="features"
                value={data.features}
                onChange={handleChange}
            />
            <TextField
                label="Enter Occupancy"
                fullWidth
                margin='normal'
                name="occupancy"
                value={data.occupancy}
                onChange={handleChange}
            />
            <TextField
                label="Enter Room Number"
                fullWidth
                margin='normal'
                name="roomNumber"
                value={data.roomNumber}
                onChange={handleChange}
            />
            <InputLabel id="select-room-type-label">Select Room Type</InputLabel>
            <Select
                id="select-room-type-dropdown"
                name="roomType"
                value={data.roomType}
                onChange={handleChange}
                fullWidth
                margin='normal'
            >
                <MenuItem value={"1 Bedroom"}>1 Bedroom</MenuItem>
                <MenuItem value={"2 Bedroom"}>2 Bedroom</MenuItem>
                <MenuItem value={"3 Bedroom"}>3 Bedroom</MenuItem>
            </Select>
            <Box mt={2}>
                <Button onClick={editProperty} variant="contained" color="primary">
                    Edit Property
                </Button>
            </Box>
        </Box>
    );
};

export default EditProperty;
