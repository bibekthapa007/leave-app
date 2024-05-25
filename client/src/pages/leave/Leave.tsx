import { Box } from '@chakra-ui/layout';
import { Spinner, Heading } from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

import { Any } from 'types/common';

import LeaveList from './LeaveList';
import { useLeaveQuery } from './useLeaveQuery';

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
        <LeaveComponent leaves={leaves} isLoading={isLoading} error={null} />
      </Box>
    </DashboardLayout>
  );
}
