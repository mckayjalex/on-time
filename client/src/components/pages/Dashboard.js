import { Select, Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Time from '../Time.js';
import { QUERY_FLIGHTS } from '../../utils/queries.js';
import { useQuery } from '@apollo/client'

const Dashbard = () => {

    useEffect(() => {
        document.title = 'On Time | Dashboard'
    }, [])

    const [type, setType] = useState('select')
    const [flight, setFlight] = useState()
    const { data } = useQuery(QUERY_FLIGHTS);
    let flights;
    
    if (data) {
        flights = data.flights
    }

    const handleTypeChange = (event) => {
        const { value } = event.target
        setType(value)
    }

    const handleFlightChange = (event) => {
        const { value } = event.target
        setFlight(value)
    }

    return (
        <>
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
                    justifyContent='space-around'>
                    <Select bgColor='green.400' w={44} onChange={handleFlightChange} placeholder='Select Flight'>
                        {flights ? flights.map((flight) => <option key={flight._id} value={flight._id} w={'full'}>{flight.flightNo}</option>) : null}
                    </Select>
                    <Select bgColor='green.400' w={44} onChange={handleTypeChange} placeholder='Select Type...'>
                        <option value='arrival'>Arrival</option>
                        <option value='departure'>Departure</option>
                        <option value='turn'>Turn</option>
                    </Select>
                </Flex>
            </Box>
            <Time type={type} flightId={flight} />
        </>
    );
}

export default Dashbard;