import { Grid, GridItem } from "@chakra-ui/react";

import Nav from "./components/Nav";
import DashboardProfile from "./components/DashboardProfile";
import Dashboard from "./components/Dashboard";
import WorkoutLog from "./components/WorkoutLog";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <Nav />

      <Grid
        as="div"
        h="auto"
        minH="100dvh"
        bg="teal.900"
        color="gray.700"
        padding={{ base: 4, md: 6 }}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={6}
        maxWidth="container.xl"
        mx="auto"
      >
        <GridItem as="div" rounded="lg" boxShadow="md" p={5}>
          <Dashboard dashboardName={"Upper body: Bench Press"} />
        </GridItem>

        <GridItem as="div" rounded="lg" boxShadow="md" p={5}>
          <Calendar number={3} />
        </GridItem>

        <GridItem as="div" rounded="lg" boxShadow="md" p={5}>
          <WorkoutLog />
        </GridItem>

        <GridItem as="div" rounded="lg" boxShadow="md" p={5}>
          <DashboardProfile currentUser={user} />
        </GridItem>
      </Grid>
    </>
  );
}

const user = {
  id: "1",
  name: "John Mason",
  email: "john.mason@example.com",
  avatar: "https://i.pravatar.cc/300?u=iu",
};

export default App;
