import { useState } from "react";
import utils from "./utils";

//Chakra
import { Grid, GridItem } from "@chakra-ui/react";
//Components
import Nav from "./components/Nav";
import DashboardProfile from "./components/DashboardProfile";
import StatsDashboard from "./components/Dashboard";
import WorkoutLog from "./components/WorkoutLog";
import Calendar from "./components/Calendar";

const user = {
  id: "1",
  name: "John Mason",
  email: "john.mason@example.com",
  avatar: "https://i.pravatar.cc/300?u=iu",
};
const Home = () => {
  const [workoutDate, setWorkoutDate] = useState(null);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  const handleChange = (selectedDate) => {
    setWorkoutDate(selectedDate);

    const selectedDateStr = selectedDate?.toISOString().split("T")[0];
    const filteredLogs = utils.workoutLogsData.filter(
      (log) => log.date === selectedDateStr
    );

    setFilteredWorkouts(filteredLogs);
  };
  return (
    <>
      <Nav />

      <Grid
        as="div"
        h="auto"
        minH="100dvh"
        bg="teal.900"
        color="gray.700"
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
        <GridItem as="div" rounded="lg" boxShadow="md">
          <Calendar value={workoutDate} onChange={handleChange} />
        </GridItem>
        <GridItem as="div" rounded="lg" boxShadow="md" p={{ base: 2, md: 5 }}>
          <StatsDashboard workouts={filteredWorkouts} />
        </GridItem>

        <GridItem as="div" rounded="lg" boxShadow="md">
          <WorkoutLog workouts={filteredWorkouts} />
        </GridItem>

        <GridItem as="div" rounded="lg" boxShadow="md">
          <DashboardProfile currentUser={user} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
