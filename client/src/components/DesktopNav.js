import { Box, Stack, useColorModeValue, Link } from "@chakra-ui/react";
import Auth from "../utils/auth";

const DesktopNav = ({ user }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      <Box>
        <Link
          p={2}
          href={Auth.loggedIn() ? "/dashboard" : "/signedout"}
          fontSize={"sm"}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Dashboard
        </Link>
      </Box>
      <Box>
        <Link
          p={2}
          href={Auth.loggedIn() ? "/flights" : "/signedout"}
          fontSize={"sm"}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Flights
        </Link>
      </Box>
      <Box>
        <Link
          p={2}
          href={Auth.loggedIn() ? `/results/${user}` : "/signedout"}
          fontSize={"sm"}
          fontWeight={500}
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Times
        </Link>
      </Box>
    </Stack>
  );
};

export default DesktopNav;
