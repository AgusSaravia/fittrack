import { Box, List, Heading } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      as="nav"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="teal.900"
      color="white"
      p={5}
      boxShadow="md"
    >
      {" "}
      <Heading color={"White"}>Fit Track</Heading>
      <List.Root as="ul">
        <List.Item href="/dashboard">Dashboard</List.Item>
      </List.Root>
    </Box>
  );
};

export default Nav;
