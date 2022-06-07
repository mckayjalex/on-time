import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  useColorMode
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { Link as Linked } from 'react-router-dom';
import DesktopNav from './DesktopNav.js';
import MobileNav from './MobileNav.js';
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaPlane } from "react-icons/fa";
import { QUERY_USER } from '../utils/queries';

const  Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode()

  const { data } = useQuery(QUERY_USER);;
  
  let user;
  if(data) {
      user = data.user.username
  }
  

  const loggedinNav = () => {
    if (Auth.loggedIn()) {
      return (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button onClick={toggleColorMode}>
         {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={() => Auth.logout()}>
            Logout
          </Button>
        </Stack>
      )
    } else {
      return (
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button onClick={toggleColorMode}>
         {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'/login'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={'inline-flex'}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'/signup'}
            _hover={{
              bg: 'green.500',
            }}>
            Sign Up
          </Button>
        </Stack>
      )
    }
  }
  const menuItemsForMobile = () => {
    if (Auth.loggedIn()) {
      return (<Collapse in={isOpen} animateOpacity>
        <MobileNav user={user} />
      </Collapse>)
    } else {
      return (
        null
      )
    }
  }
  const menuItemsForDesktop = () => {
    if (Auth.loggedIn()) {
      return (
        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <DesktopNav user={user}/>
        </Flex>
      )
    } else {
      return (
        null
      )
    }
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justifyContent='center'>
        
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems='center'>
          <Linked to={'/'}>
            <FaPlane size='44px'/>
          </Linked>
          {menuItemsForDesktop()}
        </Flex>
        {loggedinNav()}
      </Flex>
      {menuItemsForMobile()}
    </Box>
  );
}
export default Header;