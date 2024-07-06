import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, TextField, Button } from '@mui/material';

const ListApprovals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [payload, setPayload] = useState(''); 
  const [message, setMessage] = useState(''); 
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const payload = {email:"tom.brown@example.com"};
        // const response = await axios.post('https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/getBookingApprovals', payload);
        const response = {"statusCode":200,
            "headers": {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*"
        },"body":'[{"BookingReferenceNo":"AWED123","Email": "charlie.brown@example.com","IsApproved":"0","AgentId":"A3","PropertyId":"P8","RoomNumber":"108","FromDate":"2024-07-01","ToDate":"2024-07-03"}, {"BookingReferenceNo":"QWERT123","Email": "alan.brown@example.com","IsApproved":"0","AgentId":"A3","PropertyId":"P10","RoomNumber":"110","FromDate":"2024-07-01","ToDate":"2024-07-03"}]'}
        const parsedString = JSON.parse(response.body);
        setData(parsedString);
        console.log("Data received from API:",parsedString)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleApprove = async (BookingReferenceNo) => {
    try {
      setData((prevData) => prevData.filter(item => item.BookingReferenceNo !== BookingReferenceNo));
      // const response = await axios.post('https://example.com/approve', { id });
      // if (response.status === 200) {
      //   setMessage('Booking approved');
      //   setData((prevData) => prevData.filter(item => item.id !== id));
      // }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {message && (
            <Typography variant="h6" color="success" style={{ marginBottom: '20px' }}>
              {message}
            </Typography>
          )}
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.RoomNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.FromDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.ToDate}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleApprove(item.BookingReferenceNo)}
                    style={{ marginTop: '10px' }}
                  >
                    Approve
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ListApprovals;
