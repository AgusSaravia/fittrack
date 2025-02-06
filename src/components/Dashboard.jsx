import DashboardItem from "./DashboardItem";
import { Container, Text, Center, SimpleGrid } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const Dashboard = ({ dashboardName }) => {
  return (
    <Container bg="teal.950" p={10} mb={5}>
      <Center>
        <Text color="white" mb={5} fontSize="2xl">
          {dashboardName}
        </Text>
      </Center>

      <SimpleGrid columns={{ md: 2, sm: 1 }} gap="10px">
        <DashboardItem title="Total Weight Lifted" value="200" />
        <DashboardItem title="Total Rep's Volume" value="$1000" />
        <DashboardItem title="Total Sets" value="50" />
        <DashboardItem title="Total Rep's Volume" value="$1000" />
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;
