/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserById } from 'services/users';

import DashboardLayout from 'components/DashboardLayout';
import { notify } from 'components/Toast';

import { useRolesQuery } from 'hooks/useRolesQuery';
import { useDesignationsQuery } from 'hooks/useDesignationsQuery';
import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery';

import { handleError } from 'utils/handleError';

import { Any, Role } from 'types/common';

import queryKey from 'constants/queryKey';

function Profile() {
  const designationsQuery = useDesignationsQuery({});
  const rolesQuery = useRolesQuery({});
  const { handleSubmit, register, setValue } = useForm();
  const [currentUserRoles, setCurrentUserRoles] = useState<number[]>([]);

  const { data: designations = [] } = designationsQuery;
  const { data: roles = [] } = rolesQuery;
  const { data: currentUser } = useCurrentUserQuery();

  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: (user: Any) => {
      return updateUserById(currentUser?.id as number, user);
    },

    onSuccess: () => {
      notify({ type: 'success', autoClose: 0, data: { title: 'Success', message: 'Success' } });
      queryClient.invalidateQueries({ queryKey: [queryKey.currentUser] });
    },

    onError: error => {
      handleError(error);
    },
  });

  useEffect(() => {
    if (currentUser) {
      const userRoles = currentUser.roles.map((role: Role) => role.id);
      setCurrentUserRoles(userRoles);

      setValue('name', currentUser?.name || '');
      setValue('email', currentUser?.email || '');
      setValue('designation', currentUser?.designation?.id || '');
      setValue('roles', userRoles);
    }
  }, [currentUser]);

  const onRoleChange = (e: React.ChangeEvent<HTMLInputElement>, role: Role) => {
    const roleId = role.id;
    const isChecked = e.target.checked;

    const updatedRoles = isChecked
      ? [...currentUserRoles, roleId]
      : currentUserRoles.filter(id => id !== roleId);

    setCurrentUserRoles(updatedRoles);
    setValue('roles', updatedRoles);
  };

  const onSubmit = (formData: Any) => {
    updateUser.mutate(formData);
  };

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl">
        <Flex direction="column" alignItems="flex-start" mx={5}>
          <Text as="h1" fontWeight="bold" mb={5} mt={5}>
            Profile
          </Text>
          <Container bgColor="white" p={10} borderRadius="md" boxShadow="md" maxW="6xl" w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6} align="stretch" w="100%">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" defaultValue={currentUser?.name || ''} {...register('name')} />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    defaultValue={currentUser?.email || ''}
                    {...register('email')}
                  />
                </FormControl>

                <FormControl id="designation">
                  <FormLabel>Designation</FormLabel>
                  <Select
                    placeholder="Select your designation"
                    defaultValue={currentUser?.designation?.id}
                    {...register('designation')}
                  >
                    {designations.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="role">
                  <FormLabel>Roles</FormLabel>
                  <VStack align="start">
                    {roles.map((role: Role) => (
                      <Checkbox
                        key={role.id}
                        isChecked={currentUserRoles.includes(role.id)}
                        onChange={e => onRoleChange(e, role)}
                      >
                        {role.name}
                      </Checkbox>
                    ))}
                  </VStack>
                </FormControl>

                <Button type="submit" bg="#4f46e5" _hover={{ bg: '#6366f1' }} color="white">
                  Save
                </Button>
              </VStack>
            </form>
          </Container>
        </Flex>
      </Container>
    </DashboardLayout>
  );
}

export default Profile;
