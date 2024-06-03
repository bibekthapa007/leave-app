import { Box, Text } from '@chakra-ui/layout';
import { Spinner, Heading, Button, Container } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import DashboardLayout from 'components/DashboardLayout';

import { Any } from 'types/common';

import LeaveList from './LeaveList';
import { useLeaveQuery } from '../../hooks/useLeaveQuery';
import LeaveTable from './LeaveTable';

interface LeaveData {
  leave: string;
  credits: number;
  taken: number;
  avilable: number;
}

const leaveColumns: Array<ColumnDef<LeaveData>> = [
  {
    header: 'Leave',
    accessorKey: 'leave',
    size: 240,
  },
  {
    header: 'Credits',
    accessorKey: 'credits',
    size: 240,
  },
  {
    header: 'Taken',
    accessorKey: 'taken',
    size: 100,
  },
  {
    header: 'Avilable',
    accessorKey: 'avilable',
    size: 100,
  },
];

const leaveData = [
  { leave: 'Bibek', credits: 10, taken: 5, avilable: 100 },
  { leave: 'Bibek', credits: 10, taken: 5, avilable: 100 },
];

export default function LeaveBalance() {
  const leavesQuery = useLeaveQuery({});

  const { isLoading, isSuccess, data: leaves = [] } = leavesQuery;

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <Container maxW="6xl">
          <Text fontSize="2xl" fontWeight="bold" color="gray.10">
            Leave
          </Text>
          <LeaveTable
            columns={leaveColumns}
            data={leaveData}
            emptyMessage="No leave data available."
          />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
