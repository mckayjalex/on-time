import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth.js";
import { QUERY_USER } from "../../utils/queries.js";

const Home = () => {
  const { data } = useQuery(QUERY_USER);
  let firstName;

  useEffect(() => {
    document.title = "On Time";
  }, []);

  if (data) {
    firstName = data.user.firstName;
  } else {
    firstName = "...";
  }

  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 12 }}
        >
          <Text fontSize="2xl">Welcome {firstName}...</Text>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            On Time
            <br />
            <Text as={"span"} color={"green.400"}>
              Complex made simple
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Simple app to record critical times within the aviation industry..
            <br />
            To start simply signup/login and click the button below.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              as="a"
              href={Auth.loggedIn() ? "/dashboard" : "/signedout"}
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Get Time
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
