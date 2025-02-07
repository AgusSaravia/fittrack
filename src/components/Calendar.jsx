/* eslint-disable react/prop-types */
import { Box, Container, Text } from "@chakra-ui/react";

const Calendar = ({ number }) => {
  return (
    <Container>
      <Box as="div" bg={"red.200"} h="auto" w="auto" p={5}>
        <Text fontSize={"3xl"}>{number}</Text>
      </Box>
    </Container>
  );
};
export default Calendar;
