/* eslint-disable react/prop-types */
// src/components/WorkoutLogTable.js
import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";

const WorkoutLogTable = ({ workoutLogs }) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (!workoutLogs || workoutLogs.length === 0) {
    return (
      <Box p={5} textAlign="center">
        No hay registros de entrenamiento disponibles.
      </Box>
    );
  }

  if (!isDesktop) {
    return (
      <Stack spacing={4} p={5}>
        {workoutLogs.map((log) => (
          <Box key={log.id} borderWidth="1px" borderRadius="md" p={4}>
            <Heading size="md" mb={2}>
              {log.exercise}
            </Heading>
            <Text>
              <Text as="b">Fecha:</Text> {log.date}
            </Text>
            <Text>
              <Text as="b">Sets:</Text> {log.sets}
            </Text>
            <Text>
              <Text as="b">Reps:</Text> {log.reps}
            </Text>
            <Text>
              <Text as="b">Peso:</Text> {log.weight}
            </Text>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Box overflowX="auto" p={5}>
      {" "}
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem>
          <Heading size="sm">Fecha</Heading>
        </GridItem>
        <GridItem>
          <Heading size="sm">Ejercicio</Heading>
        </GridItem>
        <GridItem>
          <Heading size="sm">Sets</Heading>
        </GridItem>
        <GridItem>
          <Heading size="sm">Reps</Heading>
        </GridItem>
        <GridItem>
          <Heading size="sm">Peso</Heading>
        </GridItem>

        {workoutLogs.map((log) => (
          <React.Fragment key={log.id}>
            {" "}
            <GridItem>{log.date}</GridItem>
            <GridItem>{log.exercise}</GridItem>
            <GridItem>{log.sets}</GridItem>
            <GridItem>{log.reps}</GridItem>
            <GridItem>{log.weight}</GridItem>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutLogTable;
