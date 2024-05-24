import { useState } from 'react';
import { Link } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { signUp } from 'services/auth';

import InputField from 'components/InputField';
import Alert from 'components/Alert';

import paths from 'utils/path';
import { parseError } from 'utils/handleError';

import { Any, CustomError } from 'types/common';

export default function SignUp() {
  const history = useHistory();

  const [errors, setErrors] = useState<CustomError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);
      await signUp(data as Any);

      history.push(paths.home);
    } catch (error) {
      const errors = parseError(error);

      setErrors(errors as CustomError[]);
    } finally {
      setIsSubmitting(false);
    }
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

          <InputField type="text" label="Email" name="email" required />

          <InputField type="text" label="Password" name="password" required />

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
