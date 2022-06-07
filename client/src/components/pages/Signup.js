import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useEffect } from 'react';

const Signup = () => {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', username: '',  password: '' });

  const [showPassword, setShowPassword] = useState(false);

  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    document.title = 'On Time | Signup'
    }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    const mutationResponse = await createUser({
     variables: {
        firstName: formState.firstName,
        lastName: formState.lastName, 
        email: formState.email,
        username: formState.username,
        password: formState.password,
      }
    });
    const token = mutationResponse.data.createUser.token;
    Auth.login(token);
  } catch (err) {
    console.log({err});
  }
  }

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    return (
      <Flex
        bg={useColorModeValue('white', 'gray.800')}>
        <Stack spacing={6} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel fontSize={{ base: '12px', md: '18px'}}>First Name</FormLabel>
                    <Input type="text" name='firstName' onChange={handleChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel fontSize={{ base: '12px', md: '18px'}}>Last Name</FormLabel>
                    <Input type="text" name='lastName' onChange={handleChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="username">
                    <FormLabel fontSize={{ base: '12px', md: '18px'}}>Username</FormLabel>
                    <Input type="text" name='username' onChange={handleChange} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel fontSize={{ base: '12px', md: '18px'}}>Email address</FormLabel>
                <Input type="email" name='email' onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel fontSize={{ base: '12px', md: '18px'}}>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={handleFormSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  };

  export default Signup;