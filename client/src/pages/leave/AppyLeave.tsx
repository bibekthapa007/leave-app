import React, { useEffect } from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

import { useLeaveTypesQuery } from 'hooks/useLeaveTypesQuery';
import { useFiscalYearsQuery } from 'hooks/useFiscalYearsQuery';

import { FiscalYear } from 'types/common'; // Adjust the import path as needed

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
  } = useForm<FormValues>();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const leaveTypesQuery = useLeaveTypesQuery({});
  const {
    isLoading: isLoadingLeaveTypes,
    isSuccess: isSuccessLeaveTypes,
    data: leaveTypes = [],
  } = leaveTypesQuery;

  const fiscalYearsQuery = useFiscalYearsQuery({});
  const {
    isLoading: isLoadingFiscalYears,
    isSuccess: isSuccessFiscalYears,
    data: fiscalYears = [],
    isError: isErrorFiscalYears,
  } = fiscalYearsQuery;

  useEffect(() => {
    if (isErrorFiscalYears) {
      console.error('Error fetching fiscal years');
    } else if (isSuccessFiscalYears) {
      console.log('Fiscal Years:', fiscalYears);
    }
  }, [isErrorFiscalYears, isSuccessFiscalYears, fiscalYears]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (!isSuccessFiscalYears || fiscalYears.length === 0) {
      console.log('No fiscal years data available');
      return;
    }

    const matchingFiscalYear = fiscalYears.find(
      fiscalYear =>
        new Date(startDate) >= new Date(fiscalYear.start_date) &&
        new Date(endDate) <= new Date(fiscalYear.end_date)
    );

    console.log(matchingFiscalYear);
  };

  return (
    <DashboardLayout bgColor="gray.80">
      <Container maxW="6xl" px={4}>
        <Text as="h1" fontWeight="bold" mb={5}>
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
                      {leaveTypes.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
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
