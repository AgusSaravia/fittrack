// src/components/WorkoutLog.js
import { Heading, Container } from "@chakra-ui/react";
import WorkoutLogTable from "./WorkoutLogsTable";

const WorkoutLog = ({ workouts }) => {
  return (
    <Container bg="teal.950" color={"white"} maxW="container.lg" p={5}>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={{ base: 4, md: 6 }}
        mt={{ base: 4, md: 6 }}
        textAlign={{ base: "center", md: "left" }}
      >
        Workout Log
      </Heading>
      <WorkoutLogTable workoutLogs={workouts} />
    </Container>
  );
};

export default WorkoutLog;
