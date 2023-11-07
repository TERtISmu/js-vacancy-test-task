import { Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { cartApi } from 'resources/cart';
import { Product } from 'resources/product/product.types';

interface ProductCardProps {
  productInfo: Product;
}

function omit(object: any, keys: string[]) {
  const result: any = {};
  Object.keys(object).forEach((key) => {
    if (!keys.includes(key)) {
      result[key] = object[key];
    }
  });
  return result;
}

const ProductCard: FC<ProductCardProps> = ({ productInfo }) => {
  const { title, price } = productInfo;

  const { mutate: addToCart } = cartApi.useAddToCart();

  const handlerAddToCart = async () => {
    await addToCart(
      omit(productInfo, ['createdOn', 'updatedOn', 'lastRequest']),
    );
  };

  return (
    <Card h={376} withBorder style={{ borderRadius: '12px' }} p={15}>
      <Card.Section>
        <Image src="images/DJI-RS-3.png" alt={title} />
      </Card.Section>

      <Stack justify="flex-start" spacing={0} p={2}>
        <Text
          mt={12}
          fw={700}
          style={{ fontSize: '20px', fontFamily: 'Inter' }}
          size="sm"
        >
          {title}
        </Text>

        <Group mt={8} position="apart">
          <Text
            fw={500}
            c="#A3A3A3"
            style={{ fontSize: '14px', fontFamily: 'Inter' }}
          >
            Price:
          </Text>
          <Text
            c="#201F22"
            fw={700}
            style={{ fontSize: '20px', fontFamily: 'Inter' }}
            mr={2}
          >
            $
            {price}
          </Text>
        </Group>

        <Button
          type="submit"
          onClick={handlerAddToCart}
          fullWidth
          mt={18}
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
            Add to Cart
          </Text>
        </Button>
      </Stack>
    </Card>
  );
};

export default ProductCard;
