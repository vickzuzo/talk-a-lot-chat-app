import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatScreen, LoginScreen } from '../screens';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/chats" element={<ChatScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
