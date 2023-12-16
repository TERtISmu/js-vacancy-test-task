import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import { RoutePath } from 'routes';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

type SignInParams = z.infer<typeof schema> & { credentials?: string };

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInParams>({ resolver: zodResolver(schema) });

  const { mutate: signIn, isLoading: isSignInLoading } = accountApi.useSignIn<SignInParams>();

  const onSubmit = (data: SignInParams) => signIn(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Group mx="auto" mt="300px" sx={{ height: '360px' }}>
        <Stack sx={{ width: '408px' }} spacing={20}>
          <Stack spacing={34}>
            <Title order={1}>Sign In</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={20}>
                <TextInput
                  {...register('email')}
                  label="Email Address"
                  placeholder="Email Address"
                  error={errors.email?.message}
                />
                <PasswordInput
                  {...register('password')}
                  label="Password"
                  placeholder="Enter password"
                  error={errors.password?.message}
                />
              </Stack>
              <Button
                loading={isSignInLoading}
                type="submit"
                fullWidth
                mt={34}
                fw={400}
                style={{
                  borderRadius: '8px',
                }}
              >
                Login Account
              </Button>
            </form>
          </Stack>
          <Group
            sx={{ fontSize: '16px', justifyContent: 'center' }}
            spacing={12}
          >
            Don&apos;t have an account?
            <Link
              type="router"
              href={RoutePath.SignUp}
              style={{
                textDecoration: 'none',
              }}
            >
              Sign up
            </Link>
          </Group>
        </Stack>
      </Group>
    </>
  );
};
export default SignIn;
