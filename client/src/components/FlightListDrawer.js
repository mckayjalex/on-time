import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Collapse,
  Input,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_FLIGHT } from "../utils/queries";
import { CREATE_FLIGHT, DELETE_FLIGHT } from "../utils/mutations";

const FlightListDrawer = ({ flights, getFlights, load }) => {

  // handle side menu
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [getFlight, { loading, data }] = useLazyQuery(QUERY_SINGLE_FLIGHT);

  // Handle Add from display
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // Get single flight query
  const handleFlightDisplay = (event) => {
    const _id = event.target.value;
    getFlight({ variables: { _id } });
    onClose()
  };

  // Handle form state
  const [formState, setFormState] = useState({
    origin: "",
    destination: "",
    flightNo: "",
    rego: "",
    deptTime: "",
    arrTime: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //Handle adding new flight
  const [createFlight] = useMutation(CREATE_FLIGHT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createFlight({
        variables: {
          origin: formState.origin,
          destination: formState.destination,
          flightNo: formState.flightNo,
          rego: formState.rego,
          deptTime: formState.deptTime,
          arrTime: formState.arrTime,
        },
      });
      getFlights();
      setShow(false);
    } catch (err) {
      console.log({ err });
    }
  };

  const [deleteFlight] = useMutation(DELETE_FLIGHT);

  const handleDeleteFlight = async (event) => {
    const id = event.target.value;
    try {
      await deleteFlight({
        variables: {
          id
        }
      })
      getFlights();
      setShow(false)
    } catch (err) {
      console.error(err)
    }
  }

  function FlightItem({ flightNo, id }) {
    return (
      <Stack
        border={'1px solid'}
        borderColor='gray.300'
        rounded={'2xl'}
        p='2'
        direction={ "row" }
        justifyContent="space-between"
        alignItems={'center'}
      >
        <Text fontWeight="semibold">{flightNo}</Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button
            onClick={handleFlightDisplay}
            value={id}
            cursor="pointer"
            colorScheme="green"s
          >
            View
          </Button>
          <Button onClick={handleDeleteFlight} value={id} cursor="pointer" colorScheme="gray">
            Delete
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      {loading ? (
        <Spinner mt={56} />
      ) : (
        <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
          <Grid
            pt={{ base: 24, md: 12 }}
            h="200px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <Stat
              as={GridItem}
              colSpan={1}
              px={{ base: 4, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                Origin
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined ? "....." : data.flight.origin}
              </StatNumber>
            </Stat>
            <Stat
              as={GridItem}
              colSpan={1}
              px={{ base: 4, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                Destination
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined ? "....." : data.flight.destination}
              </StatNumber>
            </Stat>
            <Stat
              px={{ base: 3, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                STA
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined || data.flight.arrTime === ""
                  ? "....."
                  : data.flight.arrTime}
              </StatNumber>
            </Stat>
            <Stat
              px={{ base: 4, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                STD
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined || data.flight.deptTime === ""
                  ? "....."
                  : data.flight.deptTime}
              </StatNumber>
            </Stat>
            <Stat
              as={GridItem}
              colSpan={1}
              px={{ base: 4, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                Flight No.
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined ? "....." : data.flight.flightNo}
              </StatNumber>
            </Stat>
            <Stat
              px={{ base: 3, md: 8 }}
              py={"2"}
              shadow={"xl"}
              border={"1px solid"}
              rounded={"lg"}
            >
              <StatLabel fontWeight={"medium"} isTruncated>
                Rego
              </StatLabel>
              <StatNumber
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={"medium"}
              >
                {data === undefined ? "....." : data.flight.rego}
              </StatNumber>
            </Stat>
          </Grid>
        </Box>
      )}
      <Button
        ref={btnRef}
        pos="fixed"
        bottom={{ base: "32", md: "24" }}
        right="6"
        colorScheme="green"
        onClick={onOpen}
      >
        Select Flight
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select Flight</DrawerHeader>
          <DrawerBody>
            <Stack>
              { flights &&
                flights.map((flight) => (
                  <FlightItem flightNo={flight.flightNo} val={flight._id} id={flight._id} />
                ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Box>
              <Button mr={44} mb={6} onClick={handleToggle} colorScheme="green">
                {!show ? "Add New" : "Close"}
              </Button>
              <Collapse mt={4} in={show}>
                <Input
                  onChange={handleChange}
                  my={2}
                  name="origin"
                  placeholder="ORIGIN"
                  size="sm"
                />
                <Input
                  onChange={handleChange}
                  my={2}
                  name="destination"
                  placeholder="DESTINATION"
                  size="sm"
                />
                <Input
                  onChange={handleChange}
                  my={2}
                  name="flightNo"
                  placeholder="FLIGHT NO"
                  size="sm"
                />
                <Input
                  onChange={handleChange}
                  my={2}
                  name="deptTime"
                  placeholder="STD"
                  size="sm"
                />
                <Input
                  onChange={handleChange}
                  my={2}
                  name="arrTime"
                  placeholder="STA"
                  size="sm"
                />
                <Input
                  onChange={handleChange}
                  my={2}
                  name="rego"
                  placeholder="REGO"
                  size="sm"
                />
                <Button m={2} onClick={handleFormSubmit}>
                  Add
                </Button>
              </Collapse>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FlightListDrawer;
