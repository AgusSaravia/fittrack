/* eslint-disable react/prop-types */
import { Heading, Box } from "@chakra-ui/react";
import Profile from "./Profile";

const DashboardProfile = ({ currentUser }) => {
  return (
    <Box>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={{ base: 4, md: 6 }}
        mt={{ base: 4, md: 6 }}
        textAlign={{ base: "center", md: "left" }}
      >
        Profile
      </Heading>
      <Profile user={currentUser} />
    </Box>
  );
};

export default DashboardProfile;
