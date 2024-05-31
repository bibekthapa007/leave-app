import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Container, Text, Flex, Icon, Button } from '@chakra-ui/react';
import { MdTrendingUp, MdEventAvailable, MdPerson, MdHourglassEmpty } from 'react-icons/md';

import DashboardLayout from 'components/DashboardLayout';
import Table from 'components/table/Table';

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

const boxStyle = {
  width: '550px',
  borderWidth: '1px',
  borderRadius: 'lg',
  overflow: 'hidden',
  p: '4',
  m: '4',
  boxShadow: 'base',
  bg: 'white',
};

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

function Dashboard() {
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
      cell: ({ row: { index } }) => index + 1,
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

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl">
        <Flex flexDirection="column" alignItems="center">
          <Flex>
            <Box {...boxStyle}>
              <Flex alignItems="center" mb="2">
                <Icon as={MdEventAvailable} fontSize="2xl" color="blue.500" mr="2" />
                <Text fontSize="xl">Leave Summary</Text>
              </Flex>
              {/* Content of the first box - Leave Summary */}
              {/* Placeholder content */}
              Display leave summary data here...
            </Box>
            <Box {...boxStyle}>
              <Flex alignItems="center" mb="2">
                <Icon as={MdTrendingUp} fontSize="2xl" color="green.500" mr="2" />
                <Text fontSize="xl">Leave Trends</Text>
              </Flex>
              {/* Content of the second box - Leave Trends */}
              {/* Placeholder content */}
              Display leave trends data here...
            </Box>
          </Flex>
          <Flex>
            <Box {...boxStyle}>
              <Flex alignItems="center" mb="2">
                <Icon as={MdPerson} fontSize="2xl" color="orange.500" mr="2" />
                <Text fontSize="xl">Employee Attendance</Text>
              </Flex>
              {/* Content of the third box - Employee Attendance */}
              {/* Placeholder content */}
              Display employee attendance data here...
            </Box>
            <Box {...boxStyle}>
              <Flex alignItems="center" mb="2">
                <Icon as={MdHourglassEmpty} fontSize="2xl" color="purple.500" mr="2" />
                <Text fontSize="xl">Leave Balances</Text>
              </Flex>
              {/* Content of the fourth box - Leave Balances */}
              {/* Placeholder content */}
              Display leave balances data here...
            </Box>
          </Flex>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" color="gray.10">
          Leave
        </Text>

        <Box bgColor="white">
          <Table<LeaveData>
            columns={leaveColumns}
            data={leaveData}
            className="overflow-auto"
            loading={false}
            classes={{
              tableHeaderRow: 'px-12 py-2x',
              tableBodyRow: () => 'px-12 border-line-bottom',
            }}
            emptyMessage="No allocation Offboard data."
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
}

export default Dashboard;
