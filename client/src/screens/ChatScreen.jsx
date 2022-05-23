import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';

const ChatScreen = () => {
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const data = await axios.get('/api/chat');
    setChats(data.data);
    console.log('%c data', 'color: #ff9600', data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
  <Box>
    {chats.map((chat) => (
      <Text key={chat._id}>{chat.chatName}</Text>
    ))}
  </Box>);
};

export default ChatScreen;
