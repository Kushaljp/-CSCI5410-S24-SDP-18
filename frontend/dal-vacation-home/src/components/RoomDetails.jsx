import PropertyCard from "./PropertyCard";
import  { useState} from 'react';
import {Box,Typography,Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from "./Header";


 const RoomDetails = () => {
    const location = useLocation();
    const { property, user, onBook, fromDate, toDate } = location.state || {};
  
    if (!property) {
      return <Typography color="error">No property data available.</Typography>;
    }
    // const { id } = useParams();
    // const [property, setProperty] = useState({
    //     "agentPool": "['tom.brown@example.com', 'john.doe@example.com']",
    //     "propertyId": "P3",
    //     "roomType": "1 Bedroom",
    //     "roomNumber": "102",
    //     "occupancy": "2",
    //     "ownerId": "tom.brown@example.com",
    //     "features": "['Heater', 'Wi-Fi', 'TV']"
    // });

    const cleanString = (str) => {
        console.log('String:',str.replace(/[\[\]\']+/g,"").trim(),typeof(str));
        return str.replace(/[\[\]\']+/g,'').trim();
    }
    
    return (
        <>
        <Header/>
        <Box sx={{ width: '400px', margin: 'auto' }}>
        <Typography variant="h6">Room {property.roomNumber}</Typography>
        <Typography variant="body2">Features: {cleanString(property.features)}</Typography>
        <Typography variant="body2">Occupancy: {property.occupancy}</Typography>
        <Typography variant="body2">Room Type: {property.roomType}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box mb={2}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="From Date"
              value={fromDate}
              renderInput={(props) => <TextField {...props} />}
            />
          </DemoContainer>
        </Box>
        
        <Box mb={2}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="To Date"
              value={toDate}
              renderInput={(props) => <TextField {...props} />}
            />
          </DemoContainer>
        </Box>
      </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={() => onBook(property,user.email,fromDate,toDate)}>Book</Button>
        </Box>
        </>
    );
    

};

export default RoomDetails;