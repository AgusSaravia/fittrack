import { Box } from "@chakra-ui/react";

import Nav from "./components/Nav";
import DashboardProfile from "./components/DashboardProfile";
import Dashboard from "./components/Dashboard";
import WorkoutLog from "./components/WorkoutLog";

function App() {
  return (
    <>
      <Nav></Nav>
      <Box as="div" bg="teal.900" color="white" p={5}>
        <Dashboard dashboardName={"Upper body: Bench Press"} />
        <DashboardProfile currentUser={user} />
      </Box>
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
