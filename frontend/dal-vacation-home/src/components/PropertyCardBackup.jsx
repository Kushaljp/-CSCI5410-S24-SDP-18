// import React from 'react';
// import { Card, CardContent, Typography, Button, Box } from '@mui/material';

// const PropertyCard = ({property}) => {

//     const cleanString = (str) => {
//         console.log('String:',str.replace(/[\[\]\']+/g,"").trim(),typeof(str));
//         return str.replace(/[\[\]\']+/g,'').trim();
//     }

//     console.log("Property Card page data:",property);
//     return (
//         <Card sx={{ marginBottom: 2 }}>
//             <CardContent>
//                 <Typography variant="h6">Room {property.roomNumber}</Typography>
//                 <Typography variant="body2">Features: {cleanString(property.features)}</Typography>
//                 <Typography variant="body2">Occupancy: {property.occupancy}</Typography>
//                 <Typography variant="body2">Room Type: {property.roomType}</Typography>
//             </CardContent>
//         </Card>
//     );
// };

// export default PropertyCard;



import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ user, property, onApprove,onBook }) => {
  const navigate = useNavigate();
  const [dates, setDates] = useState({});
  const [message, setMessage] = useState('');
  console.log("Property data:",property,user)
  const [fromDate, setFromDate] = useState(dayjs().hour(12).minute(0));
  const [toDate, setToDate] = useState(dayjs().hour(12).minute(0));

  const handleDateChange = (setter) => (newValue) => {
    setter(newValue.hour(12).minute(0));
  };

  const handleFromDateChange = (newValue) => {
    setFromDate(newValue.hour(12).minute(0));
    if (newValue.isAfter(toDate)) {
      setToDate(newValue.hour(12).minute(0));
    }
  };

  const handleToDateChange = (newValue) => {
    if (newValue.isAfter(fromDate)) {
      setToDate(newValue.hour(12).minute(0));
    }
  };
  // const handleDateChange = (roomId, type, value) => {
  //   setDates((prevDates) => ({
  //     ...prevDates,
  //     [roomId]: {
  //       ...prevDates,
  //       [type]: value,
  //     },
  //   }));
  // };

  const cleanString = (str) => {
            console.log('String:',str.replace(/[\[\]\']+/g,"").trim(),typeof(str));
            return str.replace(/[\[\]\']+/g,'').trim();
        }

  
  const handleCardClick = () => {
    if(user.role === 'student'){
      navigate(`/room/${property.roomNumber}`, { state: {  property, user, onBook, fromDate, toDate } });
    }
    
  }
  // const { fromDate, toDate } = dates[property.roomNumber] || {};

  return (
    <Card onClick={handleCardClick} sx={{cursor: user.role === 'student' ? 'pointer' : 'default'}}> 
      <CardContent>
        <Typography variant="h5" component="div">
          Room Number: {property.roomNumber}
        </Typography>
                {user.role === 'student' ? (
          <>
            <Typography variant="body2" color="text.secondary">
              {property.roomType} - Occupancy: {property.occupancy}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Features: {cleanString(property.features)}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker
            label="From Date"
            value={fromDate}
            onChange= {handleFromDateChange}
            //onChange={(e) => handleDateChange(property.roomNumber, 'fromDate', e.target.value)}
            renderInput={(props) => <TextField {...props} />}
            />
            <DatePicker
            label="To Date"
            value={toDate}
            onChange={handleToDateChange}
            //onChange={(e) => handleDateChange(property.roomNumber, 'toDate', e.target.value)}
            renderInput={(props) => <TextField {...props} />}
            />
            </DemoContainer>
            </LocalizationProvider>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
            label="From Date"
            type="date"
            value={fromDate || ''}
            onChange={(e) => handleDateChange(property.roomNumber, 'fromDate', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"      
            />
            </DemoContainer>
            </LocalizationProvider> */}
            {/* <TextField
              label="From Date"
              type="date"
              value={fromDate || ''}
              onChange={(e) => handleDateChange(property.roomNumber, 'fromDate', e.target.value)}
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
              onChange={(e) => handleDateChange(property.roomNumber, 'toDate', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              error={toDate < fromDate}
              helperText={toDate < fromDate ? 'To Date should not be earlier than From Date' : ''}
            /> */}
            <Button variant="contained" color="primary" onClick={() => onBook(property,user.email,fromDate,toDate)}>
              Book
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Booking Reference No: {property.bookingReferenceNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Email: {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customer Name: {user.firstname} {user.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              From Date: {property.fromDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To Date: {property.toDate}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}  onClick={() => onApprove(property.bookingReferenceNumber)}>
              Approve
            </Button>
          </>
        )}
        {message && (
          <Typography variant="h6" color="success" style={{ marginBottom: '20px' }}>
            {message}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
