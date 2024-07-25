import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import Header from './Header';

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await axios.get('https://vrnylsjiye.execute-api.us-east-1.amazonaws.com/prod/property');
        console.log("Property details:",propertyResponse)
        const propertiesData = propertyResponse.data.Items;
        const transformedProperties = propertiesData.map(property => ({
            agentPool: property.agentPool?.S || '',
            propertyId: property.propertyId?.S || '',
            roomType: property.roomType?.S || '',
            roomNumber: property.roomNumber?.N || -1,
            occupancy: property.occupancy?.N || -1,
            ownerId: property.ownerId?.S || '',
            features: property.features?.S || '',
        }));
        setBookings(transformedProperties);

        
        // const feedbackResponse = await axios.get('https://api.example.com/feedback');
        // setFeedback(feedbackResponse.data);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        <Typography variant="h4" gutterBottom>Room Bookings</Typography>
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking.propertyId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Room Number: {booking.roomNumber}</Typography>
                  <Typography>Room Type: {booking.roomType}</Typography>
                  <Typography>Occupancy: {booking.occupancy}</Typography>
                  <Typography>Features:  {booking.features}</Typography>
                  <Typography>From: {new Date(booking.fromDate).toLocaleDateString()}</Typography>
                  <Typography>To: {new Date(booking.toDate).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>Room Feedback</Typography>
        <Grid container spacing={3}>
          {feedback.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.feedbackId}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Room Number: {item.roomNumber}</Typography>
                  <Typography>Feedback: {item.feedbackText}</Typography>
                  <Typography>Rating: {item.rating}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
