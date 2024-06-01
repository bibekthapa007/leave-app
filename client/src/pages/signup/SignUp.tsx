import React, { useState } from 'react';
import { Link } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { signUp } from 'services/auth';

import useUserStore from 'stores/useUserStore';

import InputField from 'components/InputField';
import Alert from 'components/Alert';

import { useDesignationsQuery } from 'hooks/useDesignationsQuery';

import { parseError } from 'utils/handleError';
import { handleLogin } from 'utils/handleAuth';

import { Any, CustomError } from 'types/common';

import paths from 'constants/paths';

export default function SignUp() {
  const history = useHistory();
  const { updateUser } = useUserStore();
  const designationsQuery = useDesignationsQuery({});

  const { isLoading, isSuccess, data: designations = [] } = designationsQuery;

  console.log(isLoading, 'djj', designations);

  const [errors, setErrors] = useState<CustomError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [country, setCountry] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    // Add the designation ID to the body if it exists
    const designationId = formData.get('designation');
    if (designationId !== null) {
      body.designation_id = String(designationId);
    }

    try {
      setIsSubmitting(true);
      const data = await signUp(body as Any);

      handleLogin(data.tokens);
      updateUser(data.user);

      history.push(paths.home);
    } catch (error) {
      const errors = parseError(error);
      setErrors(errors as CustomError[]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField type="text" label="Full name" name="name" required />

          <InputField type="email" label="Email" name="email" required />

          <InputField type="password" label="Password" name="password" required />

          <InputField type="text" label="Department" name="department" required />

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {designations.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            type="number"
            label="Number"
            name="phone"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit number"
            required
          />

          {/* Dropdown for selecting country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              onChange={handleCountryChange}
              value={country}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a country</option>
              <option value="NEPAL">Nepal</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <Alert errors={errors} />

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {!isSubmitting ? 'Sign Up' : 'Submitting'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <Link
            href={paths.signin}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
