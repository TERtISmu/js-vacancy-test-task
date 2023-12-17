import { Container, Divider, Group, Stack, Text } from '@mantine/core';
import HistoryCard from 'components/HistoryCard/HistoryCard';
import { FC, Fragment } from 'react';
import { cartApi } from 'resources/cart';

const ProductCard: FC = () => {
  const { data } = cartApi.useHistoryList();

  return (
    <Stack spacing={12} w={807}>
      <Group spacing={0} style={{ padding: '12px 0' }}>
        <Text
          w={519}
          size={16}
          fw={400}
          c="#767676"
        >
          Item
        </Text>
        <Text
          w={144}
          ta="right"
          size={16}
          fw={400}
          c="#767676"
        >
          Unit Price
        </Text>
        <Text
          w={144}
          ta="right"
          size={16}
          fw={400}
          c="#767676"
        >
          Date
        </Text>
      </Group>

      {data?.purchasedProducts?.length ? (
        data?.purchasedProducts.map((product, index) => (
          <Fragment key={product.id}>
            {index !== 0 && <Divider style={{ border: '1px #CFCFCF solid' }} />}
            <HistoryCard productInfo={product} />
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
  );
};

export default ProductCard;
