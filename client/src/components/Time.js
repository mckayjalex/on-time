import {
  Box,
  Button,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  useColorModeValue,
  Heading,
  AlertIcon,
  AlertDescription,
  Alert,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_FLIGHT, QUERY_USER } from "../utils/queries";
import { CREATE_RESULT } from "../utils/mutations";
import { useState } from "react";
import moment from 'moment';

function StatsCard({ title, handleData, name, handleTime, time}) {

  return (
  <Stat
      as={GridItem}
      cursor='pointer'
      textAlign="center"
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel pb={6} fontWeight={"medium"}>
        {title}
      </StatLabel>
      <Input
        name={name}
        onChange={handleData}
        onClick={handleTime}
        textAlign="center"
        fontWeight={"medium"}
        value={time}
        placeholder={moment().format('HH:mm').toString() + '...'}
      />
    </Stat>
  );
}

const Time = ({ type, flightId }) => {
  let flight;

  const [resultData, setResultData] = useState({
    onGround: "",
    onChocks: "",
    gateClearance: "",
    lirDelivered: "",
    cargoDoorsClosed: "",
    doorsClosed: "",
    beaconsOn: "",
    offChocks: "",
    offGround: "",
  });

  const [createResult] = useMutation(CREATE_RESULT);

  const { data } = useQuery(QUERY_SINGLE_FLIGHT, {
    variables: {
      _id: flightId,
    },
  });
  if (data) {
    flight = data.flight;
  }

  const user = useQuery(QUERY_USER)
  let username;
    if(user) {
   username = user.data || {} ;
  }

  const handleTimeData = (event) => {
    const { name, value } = event.target;
    setResultData({
      ...resultData,
      [name]: value,
    });
  };

  

  const handleResultSubmit = async () => {
    const result = await createResult({
      variables: {
        ...flight,
        onGround: resultData.onGround,
        onChocks: resultData.onChocks,
        gateClearance: resultData.gateClearance,
        lirDelivered: resultData.lirDelivered,
        cargoDoorsClosed: resultData.cargoDoorsClosed,
        doorsClosed: resultData.doorsClosed,
        beaconsOn: resultData.beaconsOn,
        offChocks: resultData.offChocks,
        offGround: resultData.offGround,
        username: username.user.username
      },
    });
    
    window.location.assign(`/result/${result.data.createResult._id}`)
  };


  const getTime = () => {
    return moment().format('HH:mm').toString();
  }

  const handleTime = (event) => {
    const { name } = event.target;
    setResultData({
      ...resultData,
      [name]: getTime(),
    });
  }

  return (
    <Box
      maxW="7xl"
      mb={{ base: "140px", md: "120px" }}
      mx={"auto"}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 8, lg: 8 }}>
        {type === "turn" || type === "arrival" ? (
          <StatsCard
            name={"onGround"}
            title={"On Ground"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.onGround}
          />
        ) : null}
        {type === "turn" || type === "arrival" ? (
          <StatsCard
            name={"onChocks"}
            title={"On Chocks"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.onChocks}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"gateClearance"}
            title={"Gate Clearance"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.gateClearance}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"lirDelivered"}
            title={"LIR Delivered"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.lirDelivered}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"cargoDoorsClosed"}
            title={"Cargo Doors Closed"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.cargoDoorsClosed}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"doorsClosed"}
            title={"Doors Closed"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.doorsClosed}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"beaconsOn"}
            title={"Beacons On"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.beaconsOn}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"offChocks"}
            title={"Off Chocks"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.offChocks}
          />
        ) : null}
        {type === "turn" || type === "departure" ? (
          <StatsCard
            name={"offGround"}
            title={"Off Ground"}
            handleData={handleTimeData}
            handleTime={handleTime}
            time={resultData.offGround}
          />
        ) : null}
      </SimpleGrid>
      {type === "arrival" || type === "departure" || type === "turn" ? (
        <Stack mt={12}>
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              Click finish to view data..
            </AlertDescription>
          </Alert>
          <Button onClick={handleResultSubmit}>Finish</Button>
        </Stack>
      ) : (
        <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={"50px"} color={"blue.500"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Please select Flight and type..
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default Time;
