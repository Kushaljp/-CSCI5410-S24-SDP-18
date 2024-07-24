// src/components/EditProperty.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, CircularProgress, Card, CardContent, TextField, Button, Box } from '@mui/material';
import Header from './Header';

const EditProperty = () => {
  const [editingProperties, setEditingProperties] = useState([]);
  const [editedProperties, setEditedProperties] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [noEditPropertiesMessage, setNoEditPropertiesMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://example.com/api/editProperties');
        if (response.data.length === 0) {
          setNoEditPropertiesMessage('No properties available for editing.');
        }
        setEditingProperties(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (propertyId, field, value) => {
    setEditedProperties(prev => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        [field]: value
      }
    }));
  };

  const handleSave = async (propertyId) => {
    try {
      const updatedProperty = editedProperties[propertyId];
      await axios.put(`https://example.com/api/editProperties/${propertyId}`, updatedProperty);
      setEditingProperties(prev =>
        prev.map(prop =>
          prop.propertyId === propertyId ? { ...prop, ...updatedProperty } : prop
        )
      );
      alert('Property updated successfully.');
    } catch (err) {
      console.error('Error saving property:', err);
      alert('Error saving property.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <>
      <Header />
      <Box mt={3}>
        <Typography variant="h4" gutterBottom style={{ marginLeft: '30px' }}>
          Edit Properties
        </Typography>
        <Grid container spacing={3}>
          {editingProperties.length > 0 ? (
            editingProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Property ID: {property.propertyId}</Typography>
                    <TextField
                      label="Location"
                      value={editedProperties[property.propertyId]?.location || property.location}
                      onChange={(e) => handleChange(property.propertyId, 'location', e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Price"
                      value={editedProperties[property.propertyId]?.price || property.price}
                      onChange={(e) => handleChange(property.propertyId, 'price', e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                    {/* Add more fields as needed */}
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSave(property.propertyId)}
                      >
                        Save
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px', marginLeft: '30px' }}>
              {noEditPropertiesMessage}
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default EditProperty;
