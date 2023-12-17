import { Group, Text } from '@mantine/core';
import { FC } from 'react';
import { PusrchasedProduct } from 'resources/user/user.types';

interface ProductCardProps {
  productInfo: PusrchasedProduct;
}

const MyCartCard: FC<ProductCardProps> = ({ productInfo }) => {
  const { title, price, purchaseDate, photoUrl } = productInfo;

  const inputDate = new Date(purchaseDate);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <Group h={80} position="left" spacing={0}>
      <Group w={519} spacing={25}>
        <img
          src={photoUrl || 'images/DJI-RS-3.png'}
          alt={title || 'DJI-RS-3.png'}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <Text
          fw={700}
          size={16}
          color="#201F22"
        >
          {title}
        </Text>
      </Group>
      <Text
        w={144}
        ta="right"
        fw={400}
        size={16}
      >
        $
        {price}
      </Text>
      <Group
        w={144}
        position="right"
        spacing={12}
      >
        <Text fw={400} size={16}>{formattedDate}</Text>
      </Group>
    </Group>
  );
};

export default MyCartCard;
