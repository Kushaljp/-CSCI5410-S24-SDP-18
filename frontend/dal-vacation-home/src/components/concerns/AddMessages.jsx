import React, { useState,useEffect } from 'react';
import { Box, TextField, Button, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';


const AddMessages = ({concern}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            console.log("Concerns detail in Add Messages:",concern)
            // {
            //     params: { "chat_id": concern.booking_reference }
            // }
            const response = await axios.post('https://us-central1-csci-5408-data-management.cloudfunctions.net/getConversation',{ "chat_id": concern.booking_reference } );
            console.log("Response:::",response)
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [concern]);


    const handleAddMessage = async () => {
        try {
            const request = {
                "chat_id": concern.booking_reference,
                "sender": concern.customer_email,
                "message": message
            }
            await axios.post('https://us-central1-csci-5408-data-management.cloudfunctions.net/addMessageToChats', request);
            // setMessages([...messages, message]);
            setMessage('');
            fetchMessages()
            
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h4" mb={2}>Chat</Typography>
            <Box display="flex" mb={2}>
                <TextField
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                    fullWidth
                />
                <Button
                    onClick={handleAddMessage}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                >
                    Add Message
                </Button>
            </Box>
            <List>
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <ListItem key={index}>
                        {msg.sender === concern.customer_email ? 'You: ' : 'Agent: '}
                         <Typography>{msg.message}</Typography>
                    </ListItem>
                ))): (
                    <Typography>No messages yet</Typography>
                )}
            </List>
        </Box>
    );
};

export default AddMessages;
