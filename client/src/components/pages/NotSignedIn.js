import { Box, Heading, Text, Button } from "@chakra-ui/react";

const NotSignedIn = () => {
  return (
    <Box textAlign="center" py={44} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, green.400, green.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Error
      </Text>
      <Text color={"gray.500"} mb={6}>
        You must be signed in to view this page
      </Text>

      <Button
        as="a"
        colorScheme="green"
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        color="white"
        variant="solid"
        href="/login"
      >
        Sign in
      </Button>
    </Box>
  );
};

export default NotSignedIn;
