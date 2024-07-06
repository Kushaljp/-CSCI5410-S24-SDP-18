import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress,Button,TextField } from '@mui/material';

const ListRooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingRefNumber, setBookingRefNumber] = useState('');
  const [dates, setDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/getData?table_name=Property');
        // const response = await axios.get('https://kiuy4j7k8h.execute-api.us-east-1.amazonaws.com/prod/property')
        const response = {"data":{"body":[{ propertyId:"P112",ownerId: 'tom.brown@example.com', features: 'Heater,TV', occupancy: '4', roomNumber: '112', roomType: '2 Bedroom' },{propertyId:"P111",ownerId: 'john.doe@example.com', features: 'Heater,Wi-Fi', occupancy: '2', roomNumber: '111', roomType: '1 Bedroom' },{propertyId:"P113",ownerId: 'tom.brown@example.com', features: 'Heater,TV,Wi-Fi', occupancy: '6', roomNumber: '113', roomType: '3 Bedroom'},{propertyId:"P114",ownerId: 'tom.brown@example.com', features: 'Heater,TV,Wi-Fi', occupancy: '6', roomNumber: '114', roomType: '3 Bedroom'} ]}}
        // console.log(response.data,typeof(response.data))
        setData(response.data.body);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateRefCode = async(roomDetails,userName,fromDate,toDate) => {
    try{
      // const { fromDate, toDate } = dates[roomDetails.id] || {};
      console.log(roomDetails.RoomNumber,roomDetails.PropertyId,fromDate,toDate);
      const payload = { booking_request: {
        UserName: userName,
        RoomNumber: parseInt(roomDetails.RoomNumber),
        PropertyId: roomDetails.PropertyId,
        IsApproved: 0,
        FromDate: fromDate,
        ToDate: toDate
      }};
      // const response = await axios.post('https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/bookingRoom',
      //  payload, {headers:{'Content-Type':'application/json'},}
      // );
      const response = await axios.post(
        'https://vyu0d2o6y6.execute-api.us-east-1.amazonaws.com/dev/bookingRoom',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data,typeof(response.data));
      const responseBody = JSON.parse(response.data.body);
      if (responseBody.bookingReferenceId) {
        setBookingRefNumber(responseBody.bookingReferenceId);
      } else {
        setBookingRefNumber(''); 
      }
    }
    catch(error){
      console.error("Error while booking room:",error)
    }

  }

  const handleDateChange = (roomId, type, value) => {
    setDates(prevDates => ({
      ...prevDates,
      [roomId]: {
        ...prevDates[roomId],
        [type]: value
      }
    }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    
    
    <Grid container spacing={3}>
  
    {bookingRefNumber && (
      <Typography variant="h6" gutterBottom style={{marginTop: '20px', marginLeft: '30px'}}>
        We have received your Booking request.
        You will get an email once your booking is approved by an agent. Booking Reference Number: {bookingRefNumber}.
        Please keep this booking reference number with you and you can ask any concerns about using this booking reference number.
      </Typography>
    )}
    
      {data.map((item) => {
      const { fromDate, toDate } = dates[item.roomNumber] || {};
        return (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Room Number:  {item.roomNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.type} - Occupancy: {item.occupancy}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.features}
              </Typography>
              <TextField
                label="From Date"
                type="date"
                value={fromDate || ''}
                onChange={(e) => handleDateChange(item.roomNumber, 'fromDate', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="To Date"
                type="date"
                value={toDate || ''}
                onChange={(e) => handleDateChange(item.roomNumber, 'toDate', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                error={toDate < fromDate} 
                helperText={toDate < fromDate ? "To Date should not be earlier than From Date" : ""}
              />
              <Button onClick ={() => generateRefCode(item,"tom.brown@example.com",fromDate,toDate)} variant="contained" color="primary">
                Book
              </Button>
            </CardContent>
          </Card>
        </Grid>
        );
      })}
    </Grid>
  );
};

export default ListRooms;
