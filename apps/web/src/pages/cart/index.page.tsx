import Head from 'next/head';
import { NextPage } from 'next';
import { Stack, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { cartApi } from 'resources/cart';
import MyCart from './components/MyCart/MyCart';
import History from './components/History/History';
import Summary from './components/Summary/Summary';

const YourProducts: NextPage = () => {
  const [showProducts, setShowProducts] = useState('My cart');
  const { data } = cartApi.useList();
  const totalPrice = data?.productsInCart?.reduce((accumulator, product) => {
    const price = product.price ?? 0;
    const quantity = product.quantityInCart ?? 0;
    return accumulator + price * quantity;
  }, 0);

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
                fontSize: '20px',
                fontWeight: '600',
                padding: '0',
                color: showProducts === 'My cart' ? '#201F22' : '#A3A3A3',
                backgroundColor: '#FCFCFC',
              }}
            >
              My cart
            </Button>
            <Button
              onClick={() => setShowProducts('History')}
              style={{
                fontSize: '20px',
                fontWeight: '600',
                padding: '0',
                color: showProducts === 'History' ? '#201F22' : '#A3A3A3',
                backgroundColor: '#FCFCFC',
              }}
            >
              History
            </Button>
          </Group>
          {showProducts === 'My cart' ? <MyCart /> : <History />}
        </Stack>
        {showProducts === 'My cart' && totalPrice !== 0 ? (
          <Summary totalPrice={totalPrice} />
        ) : null}
      </Group>
    </>
  );
};

export default YourProducts;
