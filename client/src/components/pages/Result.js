import {
  SimpleGrid,
  Flex,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  Center,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaPaperPlane, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsDoorClosedFill,
  BsFillBagCheckFill,
} from "react-icons/bs";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoMdFlashlight } from "react-icons/io";
import { QUERY_SINGLE_RESULT } from "../../utils/queries";
import { useEffect, useState } from "react";

const Feature = ({ text, icon, iconBg, time }) => {
  return (
    <Stack direction={"row"} align={"center"} my={6}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"flex-start"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={300} fontSize={{ base: "x-small", md: "lg" }}>
        {text}
      </Text>
      <Text color={useColorModeValue("black", "white")} fontSize={{ base: "small", md: "lg" }} fontWeight="extrabold">
        {time}
      </Text>
    </Stack>
  );
};

const Result = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = "On Time | Result";
  }, []);

  const { loading, data } = useQuery(QUERY_SINGLE_RESULT, {
    variables: {
      _id: id,
    },
  });

  const [loadState] = useState(loading);
  const result = data?.result || {};
  const deptTime = result.deptTime;
  const offChocks = result.offChocks;

  const late = () => {
      return deptTime < offChocks ; 
  };

  return (
    <Center py={2} bgColor={late() ? "red.600" : "green.600"}>
      {loadState ? (
        <SimpleGrid columns={2} spacing={4}>
          <Container>
            <Stack>
              <Text
                textTransform={"uppercase"}
                textAlign="center"
                color={{ light: "black", dark: "white" }}
                fontWeight={600}
                fontSize={"sm"}
                p={2}
                rounded={"md"}
              >
                Times
              </Text>
            </Stack>
            <Feature
              icon={
                <Icon
                  as={FaPlaneArrival}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"On Ground"}
              time={result.onGround}
            />
            <Feature
              icon={
                <Icon
                  as={BsArrowsCollapse}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"On Chocks"}
              time={result.onChocks}
            />
            <Feature
              icon={
                <Icon
                  as={MdOutlineEmojiPeople}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Gate Clearance"}
              time={result.gateClearance}
            />
            <Feature
              icon={
                <Icon
                  as={AiOutlineFileDone}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"LIR Delivered"}
              time={result.lirDelivered}
            />
            <Feature
              icon={
                <Icon
                  as={BsFillBagCheckFill}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Cargo Doors Closed"}
              time={result.cargoDoorsClosed}
            />
            <Feature
              icon={
                <Icon
                  as={BsDoorClosedFill}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Doors Closed"}
              time={result.doorsClosed}
            />
            <Feature
              icon={
                <Icon
                  as={IoMdFlashlight}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Beacons On"}
              time={result.beaconsOn}
            />
            <Feature
              icon={
                <Icon
                  as={BsArrowsExpand}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Off Chocks"}
              time={result.offChocks}
            />
            <Feature
              icon={
                <Icon
                  as={FaPlaneDeparture}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Off Ground"}
              time={result.offGround}
            />
          </Container>
          <Container>
            <Stack>
              <Text
                textTransform={"uppercase"}
                textAlign="center"
                color={{ light: "black", dark: "white" }}
                fontWeight={600}
                fontSize={"sm"}
                p={2}
                bg
                rounded={"md"}
              >
                Flight Details
              </Text>
            </Stack>
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Origin"}
              time={result.origin}
            />
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Destination"}
              time={result.destination}
            />
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Flight No."}
              time={result.flightNo}
            />
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"STD"}
              time={result.deptTime}
            />
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"STA"}
              time={result.arrTime}
            />
            <Feature
              icon={
                <Icon
                  as={FaPaperPlane}
                  color={{ light: "black", dark: "white" }}
                  w={5}
                  h={5}
                />
              }
              text={"Rego"}
              time={result.rego}
            />
          </Container>
        </SimpleGrid>
      ) : (
        <Spinner mt={44} />
      )}
    </Center>
  );
};

export default Result;
