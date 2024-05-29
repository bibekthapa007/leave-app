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
} from '@chakra-ui/react';

function Profile() {
  return (
    <Container maxW="xl" centerContent>
      <VStack spacing={4} align="flex-start">
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
  );
}

export default Profile;
