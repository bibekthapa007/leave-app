import React, { useState } from 'react';
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
  CheckboxGroup,
} from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

import { useRolesQuery } from 'hooks/useRolesQuery'; // Import the correct hook
import { useDesignationsQuery } from 'hooks/useDesignationsQuery';

function Profile() {
  const designationsQuery = useDesignationsQuery({});
  const rolesQuery = useRolesQuery({});

  const [selectedRoles, setSelectedRoles] = useState<number[]>([]); // Change to number[]

  const handleRoleChange = (selectedRoleIds: number[]) => {
    // Change to number[]
    setSelectedRoles(selectedRoleIds);
  };

  const {
    isLoading: isLoadingDesignations,
    isSuccess: isSuccessDesignations,
    data: designations = [],
  } = designationsQuery;

  const { isLoading: isLoadingRoles, isSuccess: isSuccessRoles, data: roles = [] } = rolesQuery;

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl" mt={5}>
        <Flex direction="column" alignItems="flex-start" mx={5}>
          <Text as="h1" fontWeight="bold" mb={5}>
            Profile
          </Text>
          <Container bgColor="white" p={10} borderRadius="md" boxShadow="md" maxW="6xl" w="full">
            <VStack spacing={6} align="stretch" w="100%">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Enter your name" />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>

              <FormControl id="designation">
                <FormLabel>Designation</FormLabel>
                <Select placeholder="Select your designation">
                  {designations.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="role">
                <FormLabel>Roles</FormLabel>
                <CheckboxGroup value={selectedRoles} onChange={handleRoleChange}>
                  <VStack align="start">
                    {roles.map(role => (
                      <Checkbox
                        key={role.id}
                        value={role.id}
                        isChecked={selectedRoles.includes(role.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedRoles(prev => [...prev, Number(role.id)]); // Convert to number
                          } else {
                            setSelectedRoles(prev => prev.filter(id => id !== role.id));
                          }
                        }}
                      >
                        {role.name}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </FormControl>

              <Button bg="#4f46e5" _hover={{ bg: '#6366f1' }} color="white">
                Save
              </Button>
            </VStack>
          </Container>
        </Flex>
      </Container>
    </DashboardLayout>
  );
}

export default Profile;
