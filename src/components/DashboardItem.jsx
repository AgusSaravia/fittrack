/* eslint-disable react/prop-types */
import { Container, Box } from "@chakra-ui/react";
const DashboardItem = ({ title, value }) => {
  return (
    <Container
      backgroundColor="teal.900"
      p="4"
      borderRadius="md"
      _hover={{ border: "1px solid orange" }}
    >
      <Box color="orange.300" p="4" borderRadius="md">
        <h3>{title}</h3>
        <p>{value}</p>
      </Box>
    </Container>
  );
};

export default DashboardItem;
