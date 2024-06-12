import { Box, Text } from '@chakra-ui/layout';
import { Spinner, Container } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import DashboardLayout from 'components/DashboardLayout';
import Table from 'components/table/Table';

import { useUsersQuery } from 'hooks/useUsersQuery';

import { User } from 'types/User';

export default function Employee() {
  const usersQuery = useUsersQuery({});

  const { isLoading, isSuccess, data: users = [] } = usersQuery;

  const userColumns: Array<ColumnDef<User>> = [
    {
      header: 'SN',
      cell: ({ row: { index } }: { row: { index: number } }) => index + 1,
      size: 40,
    },
    {
      header: "Employee's Name",
      accessorKey: 'name',
      size: 240,
      enableSorting: true,
    },
    {
      header: 'Designation',
      accessorKey: 'designationName',
      size: 150,
    },
    {
      header: 'Department',
      accessorKey: 'department',
      size: 150,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      size: 200,
    },
    {
      header: 'Phone Number',
      accessorKey: 'phone',
      size: 150,
    },
    {
      header: 'Country',
      accessorKey: 'country',
      size: 100,
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Spinner size="lg" color="gray.400" />
        </Box>
      </DashboardLayout>
    );
  }

  if (!isSuccess) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Text fontSize="lg" color="red.500">
            Failed to fetch employee data.
          </Text>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <Container maxW="6xl">
          <Text fontSize="2xl" fontWeight="bold" color="gray.10" mb={5} mt={5}>
            Employee
          </Text>
          <Table
            loading={false}
            columns={userColumns}
            data={users}
            emptyMessage="No employee data available."
          />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
