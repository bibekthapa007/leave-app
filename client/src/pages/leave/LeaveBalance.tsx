import { Box, Text, Spinner, Container } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';

import LeaveTable from 'pages/leave/LeaveTable';

import DashboardLayout from 'components/DashboardLayout';

import { useLeaveCreditsQuery } from 'hooks/useLeaveCreditsQuery';
import { useLeaveTypesQuery } from 'hooks/useLeaveTypesQuery';

import { LeaveCredit } from 'types/common';

export default function LeaveBalance() {
  const leavesQuery = useLeaveCreditsQuery({});
  const leaveTypesQuery = useLeaveTypesQuery({});

  const {
    isLoading: isLoadingLeaveCredits,
    isSuccess: isSuccessLeaveCredits,
    data: leaveCredits = [],
  } = leavesQuery;

  const {
    isLoading: isLoadingLeaveTypes,
    isSuccess: isSuccessLeaveTypes,
    data: leaveTypes = [],
  } = leaveTypesQuery;

  const combinedData = leaveCredits.map(leaveCredit => {
    const leaveType = leaveTypes.find(type => type.id === leaveCredit.id);

    return {
      ...leaveCredit,
      leave: leaveType ? leaveType.name : 'Unknown',
      available: leaveCredit.id - leaveCredit.id,
    };
  });

  const leaveColumns: Array<ColumnDef<LeaveCredit>> = [
    {
      header: 'Leave',
      accessorKey: 'leave',
      size: 240,
    },
    {
      header: 'Credits',
      accessorKey: 'leaveDays',
      size: 240,
    },
    {
      header: 'Taken',
      accessorKey: 'takenDays',
      size: 100,
    },
    {
      header: 'Available',
      accessorKey: 'available',
      size: 100,
    },
  ];

  if (isLoadingLeaveCredits || isLoadingLeaveTypes) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Spinner size="lg" color="gray.400" />
        </Box>
      </DashboardLayout>
    );
  }

  if (!isSuccessLeaveCredits || !isSuccessLeaveTypes) {
    return (
      <DashboardLayout bgColor="white">
        <Box pt={2} textAlign="center">
          <Text fontSize="lg" color="red.500">
            Failed to fetch leave data.
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
            Leave
          </Text>
          <LeaveTable
            columns={leaveColumns}
            data={combinedData}
            emptyMessage="No leave data available."
          />
        </Container>
      </Box>
    </DashboardLayout>
  );
}
