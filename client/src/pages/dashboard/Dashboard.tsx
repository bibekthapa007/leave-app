/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Container, Text } from '@chakra-ui/react';

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
          <Text fontSize="2xl" fontWeight="bold" color="gray.10">
            Leave
          </Text>

          <Box bgColor="white">
            <Table<LeaveData>
              columns={leaveColumns}
              data={leaveData}
              className="overflow-auto "
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
