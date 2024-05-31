import React from 'react';
import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

function Profile() {
  return (
    <DashboardLayout bgColor="gray.80">
      <Flex direction="column" alignItems="flex-start" ml={20}>
        <Text as="h1" fontWeight="bold" ml={20}>
          Profile
        </Text>
      </Flex>
      <Container
        maxW="6xl"
        centerContent
        bgColor="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        mt={10}
      >
        <VStack spacing={6} align="stretch" w="100%">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Enter your name" />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Select placeholder="Select your role">
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </Select>
          </FormControl>

          <FormControl id="options">
            <FormLabel>Options</FormLabel>
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
          </FormControl>

          <Button colorScheme="teal">Save</Button>
        </VStack>
      </Container>
    </DashboardLayout>
  );
}

export default Profile;
