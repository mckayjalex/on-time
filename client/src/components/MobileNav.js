import { Flex, useColorModeValue, Text, Stack} from "@chakra-ui/react";
import Auth from '../utils/auth';

const MobileNav = ({ user }) => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        <Stack spacing={4}>
          <Flex
            py={2}
            as='a'
            href={Auth.loggedIn() ? '/dashboard' : '/signedout'}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}>
              Dashboard
            </Text>
          </Flex>
          <Flex
            py={2}
            as='a'
            href={Auth.loggedIn() ? '/flights' : '/signedout'}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}>
              Flights
            </Text>
          </Flex>
          <Flex
            py={2}
            as='a'
            href={Auth.loggedIn() ? `/results/${user}` : '/signedout'}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}>
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}>
              Times
            </Text>
          </Flex>
        </Stack>
      </Stack>
    );
  };

  export default MobileNav;