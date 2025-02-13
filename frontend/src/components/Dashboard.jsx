/* eslint-disable react/prop-types */
import DashboardItem from "./DashboardItem";
import { Container, Text, Center, SimpleGrid } from "@chakra-ui/react";

const StatsDashboard = ({ workouts }) => {
  const totalWeight = workouts.reduce(
    (sum, workout) => sum + workout.weight * workout.sets * workout.reps,
    0
  );
  const totalReps = workouts.reduce(
    (sum, workout) => sum + workout.sets * workout.reps,
    0
  );
  const totalSets = workouts.reduce((sum, workout) => sum + workout.sets, 0);
  const totalVolume = workouts.reduce(
    (sum, workout) => sum + workout.weight * workout.sets * workout.reps,
    0
  );

  return (
    <Container bg="teal.950" w={"full"} p={{ base: 2, lg: 10 }} mb={5}>
      <Center>
        <Text color="white" mb={5} fontSize="2xl">
          Daily Workout Stats
        </Text>
      </Center>

      <SimpleGrid columns={{ md: 2, sm: 1 }} gap="10px">
        <DashboardItem
          title="Total Weight Lifted"
          value={`${totalWeight} kg`}
        />
        <DashboardItem title="Total Reps" value={totalReps} />
        <DashboardItem title="Total Sets" value={totalSets} />
        <DashboardItem
          title="Volume (Weight × Sets × Reps)"
          value={`${totalVolume} kg`}
        />
      </SimpleGrid>
    </Container>
  );
};

export default StatsDashboard;
