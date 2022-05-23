import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import AppRouter from './routes';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  );
}

export default App;
