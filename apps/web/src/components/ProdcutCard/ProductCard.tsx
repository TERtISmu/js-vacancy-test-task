import { Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import { FC } from 'react';

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  productPrice: string;
}

const ProductCard: FC<ProductCardProps> = ({
  imageSrc,
  productName,
  productPrice,
}) => {
  console.log('hello');
  return (
    <Card withBorder style={{ borderRadius: '12px' }} p={15}>
      <Card.Section>
        <Image src={imageSrc} alt={productName} />
      </Card.Section>

      <Stack justify="flex-start" spacing={0} p={2}>
        <Text
          mt={12}
          fw={700}
          style={{ fontSize: '20px', fontFamily: 'Inter' }}
          size="sm"
        >
          {productName}
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
            {productPrice}
          </Text>
        </Group>

        <Button
          type="submit"
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
