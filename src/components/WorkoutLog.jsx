import { Heading, Container } from "@chakra-ui/react";

const WorkoutLog = () => {
  return (
    <Container bg="teal.950" color={"white"} maxW="container.lg" p={5}>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={{ base: 4, md: 6 }}
        mt={{ base: 4, md: 6 }}
        textAlign={{ base: "center", md: "left" }}
      >
        {" "}
        Workout Log{" "}
      </Heading>
    </Container>
  );
};

export default WorkoutLog;
