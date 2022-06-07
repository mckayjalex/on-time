import { Box, Button, chakra, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import { QUERY_RESULTS_BY_USER } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { DELETE_RESULT } from "../../utils/mutations";

const ResultHistory = () => {
  const { user } = useParams();
  let results;

  useEffect(() => {
    document.title = "On Time | Times";
  }, []);

  const { loading, data, refetch } = useQuery(QUERY_RESULTS_BY_USER, {
    variables: {
      username: user,
    },
  });

  if (!loading) {
    results = data.resultByUser || {};
    console.log(results);
  }

  const [deleteResult] = useMutation(DELETE_RESULT);

  const handleDeleteResult = async (event) => {
    const id = event.target.value;
    try {
      await deleteResult({
        variables: {
          id
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  function ResultItem({ flightNo, createdAt, id, deptTime }) {
    return (
      <Stack
        p="4"
        boxShadow="lg"
        borderRadius="sm"
        border={"1px solid"}
        borderColor="gray.300"
        rounded={"2xl"}
      >
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{flightNo}</Text>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            Created At: {createdAt}
          </Text>
          <Text fontWeight="semibold">{deptTime}</Text>
          <Stack direction={{ base: "column", md: "row" }}>
            <Button
              as="a"
              href={`/result/${id}`}
              cursor="pointer"
              colorScheme="green"
            >
              View
            </Button>
            <Button
              value={id}
              onClick={handleDeleteResult}
              cursor="pointer"
              colorScheme="gray"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      mb={{ base: 32, md: 32 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Get Times...
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {results ?
          results.map((result) => (
              <ResultItem
                flightNo={result.flightNo}
                createdAt={result.createdAt}
                id={result._id}
                deptTime={result.deptTime}
              />
            ))
          : <Spinner ml={{ base: '200px',md: '600px'}} mt={{ base: '100px',md: '200px'}}/>}
      </SimpleGrid>
    </Box>
  );
};

export default ResultHistory;
