/* eslint-disable react/prop-types */
import {
  Avatar,
  HStack,
  Stack,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";

const Profile = ({ user }) => {
  const { name, email, avatar, id } = user || {};
  return (
    <Stack gap="8">
      <Container bg="teal.950" p="10" borderRadius="md">
        <HStack key={id} gap="10">
          <Avatar.Root>
            <Avatar.Fallback name={name} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>
          <Stack gap="4">
            <Text fontWeight="lg">{name}</Text>
            <Text color="orange.300" textStyle="2xl">
              {email}
            </Text>
            <Button
              bg="teal.700"
              _hover={{ backgroundColor: "teal.emphasized" }}
              size="md"
            >
              Edit Profile
            </Button>
          </Stack>
        </HStack>
      </Container>
    </Stack>
  );
};

export default Profile;
