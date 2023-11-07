import { Container, Divider, Group, Stack, Text } from '@mantine/core';
import HistoryCard from 'components/HistoryCard/HistoryCard';
import { FC } from 'react';
import { cartApi } from 'resources/cart';

const ProductCard: FC = () => {
  const { data } = cartApi.useHistoryList();

  return (
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
          Date
        </Text>
      </Group>

      {data?.purchasedProducts?.length ? (
        data?.purchasedProducts.map((product) => (
          <HistoryCard productInfo={product} />
        ))
      ) : (
        <Container p={75}>
          <Text size="xl" color="grey">
            No results found, try add in cart.
          </Text>
        </Container>
      )}

      <Divider style={{ border: '1px #CFCFCF solid' }} />
    </Stack>
  );
};

export default ProductCard;
