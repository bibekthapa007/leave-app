import { Box, Text } from '@chakra-ui/layout';
import { Spinner, Heading, Button, Container } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import DashboardLayout from 'components/DashboardLayout';

import { Any } from 'types/common';

import LeaveList from './LeaveList';
import { useLeaveQuery } from '../../hooks/useLeaveQuery';
import LeaveTable from './LeaveTable';

interface LeaveData {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface LeaveTableActionsProps {
  id: number;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

function LeaveTableActions({ id, onApprove, onReject }: LeaveTableActionsProps) {
  return (
    <div>
      <Button size="sm" colorScheme="green" onClick={() => onApprove(id)} mr={2}>
        Approve
      </Button>
      <Button size="sm" colorScheme="red" onClick={() => onReject(id)}>
        Reject
      </Button>
    </div>
  );
}

const handleApprove = (id: number) => {
  console.log(`Approved leave with ID: ${id}`);
  // Handle approve logic here
};

const handleReject = (id: number) => {
  console.log(`Rejected leave with ID: ${id}`);
  // Handle reject logic here
};

const renderActions = (id: number) => (
  <LeaveTableActions id={id} onApprove={handleApprove} onReject={handleReject} />
);

const leaveColumns: Array<ColumnDef<LeaveData>> = [
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
    header: 'Status',
    accessorKey: 'status',
    size: 100,
  },
  {
    header: 'Start Date',
    accessorKey: 'startDate',
    size: 100,
  },
  {
    header: 'End Date',
    accessorKey: 'endDate',
    size: 100,
  },
  {
    header: 'Actions',
    cell: ({ row: { original } }) => renderActions(original.id),
    size: 160,
  },
];

const leaveData = [
  { id: 1, name: 'Bibek', status: 'Pending', startDate: '2024-06-01', endDate: '2024-06-05' },
  { id: 2, name: 'Samir', status: 'Pending', startDate: '2024-06-10', endDate: '2024-06-15' },
];

function LeaveComponent(props: Any) {
  const { leaves, isLoading, error } = props;

  if (isLoading) {
    return (
      <Heading>
        Loading <Spinner size="md" />
      </Heading>
    );
  }

  if (error) {
    return <h1>Error {error} </h1>;
  }

  if (leaves?.length === 0) {
    return <h1>No Leave Found.</h1>;
  }

  return <LeaveList leaves={leaves} />;
}

export default function Leave() {
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
