import Head from 'next/head';
import { NextPage } from 'next';
import { Stack, Button, Group, Title, Divider, Text } from '@mantine/core';
import { useState } from 'react';
import { cartApi } from 'resources/cart';
import MyCart from './components/MyCart/MyCart';
import History from './components/History/History';

const YourProducts: NextPage = () => {
  const [showProducts, setShowProducts] = useState('My cart');
  const { data } = cartApi.useList();
  const totalPrice = data?.productsInCart.reduce(
    (accumulator, product) => accumulator + product.price,
    0,
  );

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Group w={1345} m="auto" spacing={44} align="flex-start">
        <Stack w={951} mt={0} spacing={20}>
          <Group>
            <Button
              onClick={() => setShowProducts('My cart')}
              style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: '600',
                padding: '0',
                color: showProducts === 'My cart' ? '#201F22' : '#A3A3A3',
                backgroundColor: '#FFFFFF',
              }}
            >
              My cart
            </Button>
            <Button
              onClick={() => setShowProducts('History')}
              style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: '600',
                padding: '0',
                color: showProducts === 'History' ? '#201F22' : '#A3A3A3',
                backgroundColor: '#FFFFFF',
              }}
            >
              History
            </Button>
          </Group>
          {showProducts === 'My cart' ? <MyCart /> : <History />}
        </Stack>
        <Stack
          w={350}
          p={20}
          spacing={32}
          style={{
            border: '1px #ECECEE solid',
            borderRadius: '12px',
          }}
        >
          <Title
            style={{
              color: '#201F22',
              fontFamily: 'Inter',
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            Summary
          </Title>
          <Divider />
          <Group position="apart">
            <Text
              style={{
                color: '#767676',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '400',
              }}
            >
              Total price
            </Text>
            <Text
              style={{
                color: '#201F22',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              $
              {totalPrice}
            </Text>
          </Group>
          <Button
            type="submit"
            fullWidth
            fw={400}
            h={40}
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
              Proceed to Ckeckout
            </Text>
          </Button>
        </Stack>
      </Group>
    </>
  );
};

export default YourProducts;
