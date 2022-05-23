import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const handlePasswordShowSwitch = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        {
          email,
          password,
        },
        config
      );
      toast({
        title: data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl my="3" id="email" isRequired>
        <FormLabel mb="1" mt="3" fontSize="sm">
          Email Address
        </FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl my="3" id="password" isRequired>
        <FormLabel mb="1" mt="3" fontSize="sm">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordShowSwitch}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Login as Guest
      </Button>
    </VStack>
  );
};

export default Login;
