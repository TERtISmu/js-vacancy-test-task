import { Container, Divider, Group, Stack, Text } from '@mantine/core';
import MyCartCard from 'components/MyCartCard/MyCartCard';
import { FC, Fragment } from 'react';
import { cartApi } from 'resources/cart';
import NothingHereYet from '../NothingHereYet/NothingHereYet';

const ProductCard: FC = () => {
  const { data } = cartApi.useList();

  return data?.productsInCart?.length ? (
    <Stack spacing={12}>
      <Group spacing={0} style={{ padding: '12px 0' }}>
        <Text
          w={519}
          style={{
            color: '#767676',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
        >
          Item
        </Text>
        <Text
          w={144}
          ta="right"
          style={{
            color: '#767676',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
        >
          Unit Price
        </Text>
        <Text
          w={144}
          ta="right"
          style={{
            color: '#767676',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
        >
          Quantity
        </Text>
      </Group>

      {data?.productsInCart?.length ? (
        data?.productsInCart.map((product, index) => (
          <Fragment key={product.id}>
            {index !== 0 && <Divider style={{ border: '1px #CFCFCF solid' }} />}
            <MyCartCard productInfo={product} />
          </Fragment>
        ))
      ) : (
        <Container p={75}>
          <Text size="xl" color="grey">
            No results found, try add in cart.
          </Text>
        </Container>
      )}
    </Stack>
  ) : (
    <NothingHereYet />
  );
};

export default ProductCard;
