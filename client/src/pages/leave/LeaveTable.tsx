import { Text } from '@chakra-ui/layout';
import { Spinner, Heading, Button, Flex } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLeaveStatus } from 'services/leave';

import Table from 'components/table/Table';
import { notify } from 'components/Toast';

import { useLeaveRequestsQuery } from 'hooks/useLeaveRequestsQuery';

import { getFormattedDate } from 'utils/date';

import { LeaveStatusEnum } from 'types/Leave';
import { Any, LeaveRequest } from 'types/common';

import queryKey from 'constants/queryKey';

export interface LeaveTableActionsProps {
  id: number;
  updateStatus: UseMutationResult<
    Any,
    Error,
    {
      id: number;
      status: LeaveStatusEnum;
    }
  >;
}

function LeaveTableActions({ id, updateStatus }: LeaveTableActionsProps) {
  return (
    <Flex>
      <Button
        size="sm"
        colorScheme="green"
        onClick={() => updateStatus.mutate({ id, status: LeaveStatusEnum.APPROVED })}
        mr={2}
      >
        Approve
      </Button>
      <Button
        size="sm"
        colorScheme="red"
        onClick={() => updateStatus.mutate({ id, status: LeaveStatusEnum.REJECTED })}
      >
        Reject
      </Button>
    </Flex>
  );
}

const getLeaveColumns = ({
  updateStatus,
}: Omit<LeaveTableActionsProps, 'id'>): Array<ColumnDef<LeaveRequest>> => {
  return [
    {
      header: 'SN',
      cell: ({ row: { index } }: { row: { index: number } }) => index + 1,
      size: 40,
    },
    {
      header: "Employee's Name",
      accessorKey: 'userName',
      cell: ({ row }) => row.original.user.name,
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
      cell: ({ row }) => getFormattedDate(row.original.startDate),
    },
    {
      header: 'End Date',
      accessorKey: 'endDate',
      size: 100,
      cell: ({ row }) => getFormattedDate(row.original.endDate),
    },
    {
      header: 'Actions',
      cell: ({ row: { original } }) =>
        original.status === 'PENDING' ? (
          <LeaveTableActions id={original.id} updateStatus={updateStatus} />
        ) : null,
      size: 160,
    },
  ];
};

export default function LeaveTable() {
  const leaveRequestsQuery = useLeaveRequestsQuery({});
  const {
    isLoading: isLoadingLeaveRequests,
    data: leaveRequests = [],
    error: leaveRequestsError,
  } = leaveRequestsQuery;

  const queryClient = useQueryClient();

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: LeaveStatusEnum }) => {
      return updateLeaveStatus(id, { status });
    },

    onSuccess: () => {
      notify({ type: 'success', autoClose: 0, data: { title: 'Success', message: 'Success' } });
      queryClient.invalidateQueries({ queryKey: [queryKey.leaveRequests] });
    },
  });

  if (isLoadingLeaveRequests) {
    return (
      <>
        <Heading>Loading...</Heading>
        <Spinner size="md" />
      </>
    );
  }

  if (leaveRequestsError) {
    return <Heading>Error: {leaveRequestsError.message}</Heading>;
  }

  if (leaveRequests.length === 0) {
    return <Heading>No Leave Found.</Heading>;
  }

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color="gray.10">
        Leave
      </Text>
      <Table
        loading={false}
        columns={getLeaveColumns({ updateStatus })}
        data={leaveRequests}
        emptyMessage="No leave data available."
      />
    </>
  );
}
