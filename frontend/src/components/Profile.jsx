/* eslint-disable react/prop-types */
import { Avatar, Stack, Text, Container, Button, Flex } from "@chakra-ui/react";

const Profile = ({ user }) => {
  const { name, email, avatar } = user || {};
  return (
    <Flex direction="column" alignItems="center" gap="8" width="full">
      <Container
        bg="teal.950"
        maxWidth={{
          base: "95%",
          sm: "container.sm",
          md: "container.md",
          lg: "container.lg",
        }}
        p={{ base: "6", md: "10" }}
        borderRadius="md"
        boxShadow="lg"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          gap={{ base: "6", md: "10" }}
        >
          <Avatar.Root size={{ base: "lg", md: "xl" }}>
            {" "}
            <Avatar.Fallback name={name} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>
          <Stack
            textAlign={{ base: "center", md: "left" }}
            gap={{ base: "2", md: "4" }}
          >
            <Text fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>
              {name}
            </Text>{" "}
            <Text color="orange.300" fontSize={{ base: "lg", md: "xl" }}>
              {" "}
              {email}
            </Text>
            <Button
              bg="teal.700"
              _hover={{ backgroundColor: "teal.emphasized" }}
              size={{ base: "sm", md: "md" }}
              width={{ base: "full", md: "auto" }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Profile;
