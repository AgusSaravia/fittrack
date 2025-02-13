/* eslint-disable react/prop-types */
import { Container, Box, Text } from "@chakra-ui/react";
const DashboardItem = ({ title, value }) => {
  return (
    <Container
      backgroundColor="teal.900"
      p="4"
      borderRadius="md"
      _hover={{ border: "1px solid orange" }}
    >
      <Box color="orange.300" p="4" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <Text fontSize="2xl">{value}</Text>
      </Box>
    </Container>
  );
};

export default DashboardItem;
