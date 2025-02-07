// src/components/WorkoutLog.js
import { Heading, Container } from "@chakra-ui/react";
import WorkoutLogTable from "./WorkoutLogsTable";

const WorkoutLog = () => {
  const workoutLogsData = [
    {
      id: 1,
      date: "2024-07-27",
      exercise: "Bench Press",
      sets: 3,
      reps: 8,
      weight: 100,
    },
    {
      id: 2,
      date: "2024-07-27",
      exercise: "Squats",
      sets: 3,
      reps: 8,
      weight: 120,
    },
    {
      id: 3,
      date: "2024-07-26",
      exercise: "Deadlifts",
      sets: 1,
      reps: 5,
      weight: 140,
    },
    {
      id: 4,
      date: "2024-07-25",
      exercise: "Overhead Press",
      sets: 3,
      reps: 10,
      weight: 60,
    },
    {
      id: 5,
      date: "2024-07-24",
      exercise: "Barbell Rows",
      sets: 3,
      reps: 8,
      weight: 80,
    },
    {
      id: 6,
      date: "2024-07-23",
      exercise: "Pull-ups",
      sets: 3,
      reps: 6,
      weight: 0,
    },
    {
      id: 7,
      date: "2024-07-22",
      exercise: "Dips",
      sets: 3,
      reps: 10,
      weight: 0,
    },
  ];

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
      <WorkoutLogTable workoutLogs={workoutLogsData} />{" "}
    </Container>
  );
};

export default WorkoutLog;
