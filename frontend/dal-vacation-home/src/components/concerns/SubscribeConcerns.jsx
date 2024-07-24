import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography, Card, CardContent, Button } from '@mui/material';
import Header from '../Header';
import axios from 'axios';
import AddMessages from './AddMessages';

const SubscribeConcerns = () => {
    const [concern, setConcern] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chatInitialized, setChatInitialized] = useState(false);


    useEffect(() => {
        const fetchConcerns = async () => {
            try {
                const response = {
                    "booking_reference": "c53bc608-122a-466a-bdb2-6a953863668f",
                    "customer_name": "Jane",
                    "customer_email": "jane.doe@example.com",
                    "concern": "When will my booking get approved?",
                    "assigned_agent": "john.doe@example.com"
                };
                setConcern(response);
                // const response = await axios.get('https://us-central1-csci-5408-data-management.cloudfunctions.net/subscribeConcern');
                // setConcern(response.data);
                console.log(response);
            } catch (error) {
                console.error("Error while getting the concern:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcerns();
    }, []);

    const handleLiveChat = async (concern) => {
        try{
        console.log('Initiating live chat for concern:', concern);
        const initializeChatResponse = await axios.post('https://us-central1-csci-5408-data-management.cloudfunctions.net/initializeChat', {
          "booking_reference": concern.booking_reference,
          "customer_name": concern.customer_name,
          "customer_email": concern.customer_email,
          "concern": concern.concern,
          "assigned_agent" : concern.assigned_agent
      });
      console.log("Initialize Chat response:",initializeChatResponse)
      setChatInitialized(true);
    }
    catch(error){
      console.log("Error while initializing the chat:",error);
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
            {!chatInitialized ? ( 
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Agent: {concern.assigned_agent}</Typography>
                            <Typography variant="h6">Booking Reference: {concern.booking_reference}</Typography>
                            <Typography variant="body1">Customer Name: {concern.customer_name}</Typography>
                            <Typography variant="body1">Customer Email: {concern.customer_email}</Typography>
                            <Typography variant="body1">Concern: {concern.concern}</Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => handleLiveChat(concern)} 
                                style={{ marginTop: '10px' }}
                            >Live Chat
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> ) :  (
                    <AddMessages concern={concern} />
                )}
    </>    
    );
};

export default SubscribeConcerns;
