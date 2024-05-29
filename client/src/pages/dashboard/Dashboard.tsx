/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Container, Text, Flex, Icon } from '@chakra-ui/react';
import { MdTrendingUp, MdEventAvailable, MdPerson, MdHourglassEmpty } from 'react-icons/md';

import DashboardLayout from 'components/DashboardLayout';
import Table from 'components/table/Table';

import { Any } from 'types/common';

interface OffboardRowData {
  row: { original: { id: number }; index: number };
}

interface CellRowData<T> {
  // eslint-disable-next-line react/no-unused-prop-types
  row: { original: T };
}

interface LeaveData {
  id: number;
  name: string;
}

function Dashboard() {
  const leaveColumns: Array<ColumnDef<LeaveData>> = [
    {
      header: 'SN',
      cell: ({ row: { index } }: OffboardRowData) => {
        return index + 1;
      },
      size: 40,
    },

    {
      header: "Employee's Name",
      accessorKey: 'user',
      size: 240,
      enableSorting: true,
      cell: ({ row: { original } }: CellRowData<LeaveData>) => {
        return <div>{original.name}</div>;
      },
    },
  ];

  const leaveData = [
    { id: 1, name: 'bibek' },
    { id: 2, name: 'samir' },
  ];

  return (
    <DashboardLayout bgColor="gray.80">
      <div>
        <Container maxW="6xl">
          <Flex flexDirection="column" alignItems="center">
            <Flex>
              <Box
                w="400px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                m="4"
                boxShadow="base"
                bg="blue.100"
              >
                <Flex alignItems="center" mb="2">
                  <Icon as={MdEventAvailable} fontSize="2xl" color="blue.500" mr="2" />
                  <Text fontSize="xl">Leave Summary</Text>
                </Flex>
                {/* Content of the first box - Leave Summary */}
                {/* Placeholder content */}
                Display leave summary data here...
              </Box>
              <Box
                w="400px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                m="4"
                boxShadow="base"
                bg="green.100"
              >
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
              <Box
                w="400px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                m="4"
                boxShadow="base"
                bg="orange.100"
              >
                <Flex alignItems="center" mb="2">
                  <Icon as={MdPerson} fontSize="2xl" color="orange.500" mr="2" />
                  <Text fontSize="xl">Employee Attendance</Text>
                </Flex>
                {/* Content of the third box - Employee Attendance */}
                {/* Placeholder content */}
                Display employee attendance data here...
              </Box>
              <Box
                w="400px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="4"
                m="4"
                boxShadow="base"
                bg="purple.100"
              >
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
              // loading={isFetchingData}
              // options={options}
              classes={{
                tableHeaderRow: 'px-12 py-2x',
                tableBodyRow: () => 'px-12 border-line-bottom',
              }}
              emptyMessage="No allocation Offboard data."
              // onRowClick={handleRowClick}
            />
          </Box>
        </Container>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
