import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Box } from '@chakra-ui/react';

import Table from 'components/table/Table';

interface LeaveTableProps<T> {
  columns: Array<ColumnDef<T>>;
  data: T[];
  emptyMessage?: string;
}

function LeaveTable<T extends object>({
  columns,
  data,
  emptyMessage = 'No data available.',
}: LeaveTableProps<T>) {
  return (
    <Box bgColor="white">
      <Table<T>
        columns={columns}
        data={data}
        className="overflow-auto"
        loading={false}
        classes={{
          tableHeaderRow: 'px-12 py-2x',
          tableBodyRow: () => 'px-12 border-line-bottom',
        }}
        emptyMessage={emptyMessage}
      />
    </Box>
  );
}

export default LeaveTable;
