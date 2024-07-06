import { TextField, Typography,InputLabel,Select,MenuItem,Box,Button,OutlinedInput } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getUser, setUser } from '../util/user-authentication/AuthenticationUtil';


const AddProperty = () => {

    const [data,setData] = useState({ownerId:'',features:'',occupancy:'',roomNumber:'',roomType:'',agentPool:''});
    const [user,setUser] = useState(null);
    const [message,setMessage] = useState('');
    const [agents,setAgents] = useState([])

    const agentValues= ['tom.brown@example.com','john.doe@example.com','alan.brown@example.com','shaun.murphy@example.com'];
    useEffect(() => {
        const userData = getUser();
        setUser(userData)
    },[]);

    
    const handleChange = (event) => {
        const {name,value} = event.target;
        setData(prevData => ({
            ...prevData,
            [name]:value
        }));
    };

    // const handleMultipleAgentChange = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   setData( prevData => ({
    //     ...prevData,
    //     agentPool: typeof value === 'string' ? value.split(',') : value
    // }));
    // };
    const handleMultipleAgentChange = (event) => {
      const {
        target: { value },
      } = event;
      setAgents(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  


    const addproperty = async () => {
        try{
        const ownerId = user?.email;
        const propertyData = {...data, ownerId:ownerId,propertyId:'P'+data.roomNumber};
        const response = await fetch('https://kiuy4j7k8h.execute-api.us-east-1.amazonaws.com/prod/property',{method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify(propertyData)});
        if(!response.ok){
            throw new Error('Failed to add a new Property!');
        }
        const result = await response.json();
        setMessage('Property added successfully.')
        console.log(user);
        console.log(data);

        }
        catch(error){
          console.log('Error:',error)
          setMessage('Error while adding Property.')
        }
        
    }

  return (
    <>
    {message && (
            <Typography variant="h6" color="success" style={{ marginBottom: '20px' }}>
              {message}
            </Typography>
          )}
    <Box sx={{width:'400px',margin: 'auto' }}>
    <Typography variant='h5'>Add Property</Typography>
    <TextField label="Enter Features" fullWidth  margin="normal" name="features" value={data.features} onChange={handleChange}/>
    <TextField label="Enter Occupancy" fullWidth margin='normal' name="occupancy" value={data.occupancy} onChange={handleChange}/>
    <TextField label="Enter Room Number" fullWidth margin='normal' name="roomNumber" value={data.roomNumber} onChange={handleChange}/>
    <InputLabel id="select-room-type-label">Select Room Type</InputLabel>
    <Select
    id="select-room-type-dropdown"
    name="roomType"
    value={data.roomType}
    onChange={handleChange}
    label="Room Type"
    fullWidth
    >
    <MenuItem value={"1 Bedroom"}>1 Bedroom</MenuItem>
    <MenuItem value={"2 Bedroom"}>2 Bedroom</MenuItem>
    <MenuItem value={"3 Bedroom"}>3 Bedroom</MenuItem>
    </Select>
    <InputLabel id="select-multiple-agent">Select Agent:</InputLabel>
        <Select
          labelId="select-multiple-agent"
          id="select-multiple-agent"
          multiple
          value={agents}
          onChange={handleMultipleAgentChange}
          
        >
          {agentValues.map((agent) => (
            <MenuItem
              key={agent}
              value={agent}
            >
              {agent}
            </MenuItem>
          ))}
        </Select>


    <Box mt={2}>
    <Button onClick ={() => addproperty()} variant="contained" color="primary" >
    Add Property</Button>
    </Box>
    
    
    </Box>
    
    </>
  )
}

export default AddProperty;