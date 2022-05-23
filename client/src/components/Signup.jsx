import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const handlePasswordShowSwitch = () => setShow(!show);

  const postDetails = pics => {
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'talk-a-lot');
      data.append('cloud_name', 'vickzuzo');
      fetch('https://api.cloudinary.com/v1_1/vickzuzo/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          setPic(data.url.toString());
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
    // https://api.cloudinary.com/v1_1/vickzuzo/image/upload
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/register',
        {
          userName,
          email,
          password,
          pic,
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
      <FormControl my="3" id="userName" isRequired>
        <FormLabel mb="1" mt="3" fontSize="sm">
          user name
        </FormLabel>
        <Input
          placeholder="Enter Your User Name"
          onChange={e => setUserName(e.target.value)}
        />
      </FormControl>
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
      <FormControl my="3" id="pic">
        <FormLabel mb="1" mt="3" fontSize="sm">
          Upload your Profile Picture
        </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
