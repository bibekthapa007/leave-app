/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  Stack,
  Container,
  Box,
} from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

interface FormValues {
  startDate: string;
  endDate: string;
  leaveType: string;
  condition: string;
}

function AppyLeave() {
  const { handleSubmit, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    // You can handle form submission logic here
  };

  return (
    <DashboardLayout bgColor="gray.80">
      <Container size="8xl">
        <Box bgColor="white" padding={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6} align="flex-start">
              <FormControl id="leaveType">
                <FormLabel>Leave Type</FormLabel>
                <Controller
                  name="leaveType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="maternity">Maternity Leave</option>
                      {/* Add more leave types as needed */}
                    </Select>
                  )}
                />
              </FormControl>
              <FormControl id="startDate">
                <FormLabel>Starting Date</FormLabel>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} type="date" />}
                />
              </FormControl>
              <FormControl id="endDate">
                <FormLabel>Ending Date</FormLabel>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Input {...field} type="date" />}
                />
              </FormControl>
              <FormControl id="condition">
                <FormLabel>Describe Your Condition</FormLabel>
                <Controller
                  name="condition"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <Textarea {...field} />}
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

export default AppyLeave;
