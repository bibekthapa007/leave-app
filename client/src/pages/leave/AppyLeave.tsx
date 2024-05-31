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
  Container,
  Box,
  Text,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

interface FormValues {
  startDate: string;
  endDate: string;
  leaveType: string;
  condition: string;
}

function AppyLeave() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>();

  const startDate = watch('startDate');

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    // You can handle form submission logic here
  };

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl" px={4}>
        <Text as="h1" fontWeight="bold" mb={6}>
          Apply Leave
        </Text>
        <Box bgColor="white" padding={8} boxShadow="md" borderRadius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={6} align="flex-start">
              <FormControl id="leaveType" isInvalid={!!errors.leaveType}>
                <FormLabel>Leave Type</FormLabel>
                <Controller
                  name="leaveType"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Leave type is required' }}
                  render={({ field }) => (
                    <Select {...field} placeholder="Select leave type">
                      <option value="annual">Annual Leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="maternity">Maternity Leave</option>
                    </Select>
                  )}
                />
                <FormErrorMessage>{errors.leaveType && errors.leaveType.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="startDate" isInvalid={!!errors.startDate}>
                <FormLabel>Starting Date</FormLabel>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Starting date is required' }}
                  render={({ field }) => <Input {...field} type="date" />}
                />
                <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="endDate" isInvalid={!!errors.endDate}>
                <FormLabel>Ending Date</FormLabel>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Ending date is required',
                    validate: value =>
                      value >= startDate || 'End date must be after or equal to start date',
                  }}
                  render={({ field }) => <Input {...field} type="date" />}
                />
                <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="condition" isInvalid={!!errors.condition}>
                <FormLabel>Describe Your Condition</FormLabel>
                <Controller
                  name="condition"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Condition is required' }}
                  render={({ field }) => <Textarea {...field} />}
                />
                <FormErrorMessage>{errors.condition && errors.condition.message}</FormErrorMessage>
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
