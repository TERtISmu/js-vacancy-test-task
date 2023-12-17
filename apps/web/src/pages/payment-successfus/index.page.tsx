import Head from 'next/head';
import { NextPage } from 'next';
import {
  Stack,
  Text,
  Button,
} from '@mantine/core';
import { useRouter } from 'next/router';

import { RoutePath } from 'routes';
import { PartyPopperIcon } from 'public/icons';

const YourProducts: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Your Products</title>
      </Head>
      <Stack spacing={32} align="center" w={480} h={269} mt={84} sx={() => ({ backgroundColor: '#FFFFFF', margin: 'auto', padding: '20px', borderRadius: '20px' })}>
        <PartyPopperIcon />
        <Stack spacing={16} align="center">
          <Text c="#201F22" size={24} fw={600}>Payment Successfull</Text>
          <Text c="#767676" size={16} fw={400}>Hooray, you have completed your payment!</Text>
        </Stack>
        <Button
          onClick={() => {
            router.push(RoutePath.Cart);
          }}
          fw={400}
          h={40}
          w={186}
          style={{
            borderRadius: '8px',
          }}
          color="#2B77EB"
        >
          <Text
            fw={500}
            c="white"
            style={{ fontSize: '14px', fontFamily: 'Inter' }}
          >
            Back to Cart
          </Text>
        </Button>
      </Stack>
    </>
  );
};

export default YourProducts;
