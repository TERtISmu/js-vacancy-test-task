import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Group,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import { RoutePath } from 'routes';

import { CheckCircleIcon } from 'public/icons';
import { useEffect, useState } from 'react';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

type SignUpParams = z.infer<typeof schema> & { credentials?: string };

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const donePasswordRulesData = passwordRulesData.filter((ruleData) => ruleData.done);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignUpParams>({ resolver: zodResolver(schema) });

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8 && passwordValue.length <= 50;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignInLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Group mx="auto" mt={300} h={360}>
        <Stack w={408} spacing={20}>
          <Stack spacing={34}>
            <Title order={1}>Sign Up</Title>
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
                {(donePasswordRulesData.length > 0)
                && (
                <SimpleGrid
                  cols={1}
                  spacing={8}
                  p={0}
                >
                  {donePasswordRulesData.map((ruleData) => (
                    <Group spacing={12} fs="16px">
                      <CheckCircleIcon />
                      <Text color="#A3A3A3">{ruleData.title}</Text>
                    </Group>
                  ))}
                </SimpleGrid>
                )}
              </Stack>
              <Button
                loading={isSignInLoading}
                type="submit"
                fullWidth
                mt={32}
                fw={400}
                style={{
                  borderRadius: '8px',
                }}
              >
                Create Account
              </Button>
            </form>
          </Stack>

          <Group
            sx={{ fontSize: '16px', justifyContent: 'center' }}
            spacing={12}
          >
            Have an account?
            <Link
              type="router"
              href={RoutePath.SignIn}
              style={{
                textDecoration: 'none',
              }}
            >
              Sign in
            </Link>
          </Group>
        </Stack>
      </Group>
    </>
  );
};
export default SignUp;
