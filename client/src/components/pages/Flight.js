import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import FlightListDrawer from "../FlightListDrawer";
import { QUERY_FLIGHTS } from "../../utils/queries";


const Flight = () => {
  const { data, loading, refetch } = useQuery(QUERY_FLIGHTS);
  let flights;
  if (data) {
    flights = data?.flights || [];
  }

  useEffect(() => {
    document.title = "On Time | Flights";
  }, []);

  
  return (
    <Center mt={0}>
      <FlightListDrawer flights={flights} getFlights={refetch} load={loading} />
    </Center>
  );
};
export default Flight;
