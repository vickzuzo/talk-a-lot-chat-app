import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Login, Signup } from '../components';

const LoginScreen = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      maxH="100vh"
      backgroundImage="https://ak.picdn.net/shutterstock/videos/1071978925/thumb/1.jpg?ip=x480"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Container maxW="xl" centerContent>
        <Flex
          justify="center"
          align="center"
          p={2}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
        >
          <Text fontSize="2xl" color="purple.400" textTransform="uppercase">
            Talk-A-Lot
          </Text>
        </Flex>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="solid-rounded" colorScheme="purple">
            <TabList mb="1em">
              <Tab color="purple.400">Login</Tab>
              <Tab color="purple.400">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginScreen;
