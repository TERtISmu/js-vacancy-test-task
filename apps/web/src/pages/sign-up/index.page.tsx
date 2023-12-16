import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Avatar,
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

import { ShopyIcon, CheckCircleIcon } from 'public/icons';
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
      <SimpleGrid cols={2}>
        <Group mx="auto" mt="300px" sx={{ height: '360px' }}>
          <Stack sx={{ width: '408px' }} spacing={20}>
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

        <Stack
          sx={{
            width: '656px',
            height: '896px',
            background: '#F4F4F4',
            border: '1px none rgb(189, 189, 189)',
            borderRadius: '12px',
          }}
          mt="32px"
          mx="auto"
          mb="32px"
        >
          <Group spacing={10} mt={40} ml={40}>
            <Avatar>
              <ShopyIcon />
            </Avatar>
            <Title order={2}>Shopy</Title>
          </Group>
          <Stack w={460} ml={32} spacing={12} mt={570}>
            <Title order={1}>Sell and buy products super quickly!</Title>
            <Text size={20} fw={400} c="#201F22">
              Save your time, we take care of all the processing.
            </Text>
            <Group spacing={20}>
              <Avatar.Group>
                <Avatar
                  src="./icons/start-page-avatar1.svg"
                  alt="start-page-avatar1"
                  style={{
                    borderRadius: '60px',
                  }}
                />
                <Avatar
                  src="./icons/start-page-avatar2.svg"
                  alt="start-page-avatar2"
                  style={{
                    borderRadius: '60px',
                  }}
                />
                <Avatar
                  src="./icons/start-page-avatar3.svg"
                  alt="start-page-avatar3"
                  style={{
                    borderRadius: '60px',
                  }}
                />
                <Avatar
                  src="./icons/start-page-avatar4.svg"
                  alt="start-page-avatar4"
                  style={{
                    borderRadius: '60px',
                  }}
                />
                <Avatar
                  src="./icons/start-page-avatar5.svg"
                  alt="start-page-avatar5"
                  style={{
                    borderRadius: '60px',
                  }}
                />
              </Avatar.Group>
              <Group spacing={4}>
                <Text size={16} fw={700}>
                  +100
                </Text>
                <Text fw={400} size={16}>
                  users from all over the world
                </Text>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </SimpleGrid>
    </>
  );
};
export default SignUp;
