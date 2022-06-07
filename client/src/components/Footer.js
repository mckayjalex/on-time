import {
    Box,
    Button,
    Container,
    Stack,
    Text,
    useColorModeValue
  } from '@chakra-ui/react';
  import { FaGithub } from 'react-icons/fa';
  
  const Footer = () => {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        pos='fixed'
        w='full'
        bottom='0'>
    
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2022 On Time. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <Button as='a' target='_blank' label={'Github'} href={'https://github.com/mckayjalex/project-unknown'}>
              <FaGithub />
            </Button>
          </Stack>
        </Container>
      </Box>
    );
  }

  export default Footer;