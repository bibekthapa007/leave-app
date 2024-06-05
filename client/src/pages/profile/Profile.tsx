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

import { useRolesQuery } from 'hooks/useRolesQuery';
import { useDesignationsQuery } from 'hooks/useDesignationsQuery';
import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery';

function Profile() {
  const designationsQuery = useDesignationsQuery({});
  const rolesQuery = useRolesQuery({});

  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const handleRoleChange = (selectedRoleIds: number[]) => {
    setSelectedRoles(selectedRoleIds);
  };

  const {
    isLoading: isLoadingDesignations,
    isSuccess: isSuccessDesignations,
    data: designations = [],
  } = designationsQuery;

  const { isLoading: isLoadingRoles, isSuccess: isSuccessRoles, data: roles = [] } = rolesQuery;

  const {
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
    data: currentUser,
  } = useCurrentUserQuery();

  if (isLoadingCurrentUser) {
    return <div>Loading...</div>;
  }

  if (isErrorCurrentUser) {
    return <div>Error loading user data.</div>;
  }

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl">
        <Flex direction="column" alignItems="flex-start" mx={5}>
          <Text as="h1" fontWeight="bold" mb={5} mt={5}>
            Profile
          </Text>
          <Container bgColor="white" p={10} borderRadius="md" boxShadow="md" maxW="6xl" w="full">
            <VStack spacing={6} align="stretch" w="100%">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" value={currentUser?.name || ''} readOnly />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={currentUser?.email || ''} readOnly />
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
