import { Group, Image, Text } from '@mantine/core';
import { FC } from 'react';
import { PusrchasedProduct } from 'resources/user/user.types';

interface ProductCardProps {
  productInfo: PusrchasedProduct;
}

const MyCartCard: FC<ProductCardProps> = ({ productInfo }) => {
  const { title, price, purchaseDate } = productInfo;

  const inputDate = new Date(purchaseDate);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  console.log(typeof title, price, purchaseDate);

  return (
    <Group h={80} position="left" spacing={0}>
      <Group w={519} spacing={25}>
        <Image
          src="images/DJI-RS-3.png"
          alt={title}
          height={80}
          width={80}
          fit="fill"
          radius={8}
        />
        <Text
          style={{
            color: '#201F22',
            fontSize: '16px',
            fontFamily: 'Inter',
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      </Group>
      <Text
        w={144}
        ta="right"
        style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '16px' }}
      >
        $
        {price}
      </Text>
      <Group
        w={144}
        position="right"
        spacing={12}
        style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '16px' }}
      >
        <Text>{formattedDate}</Text>
      </Group>
    </Group>
  );
};

export default MyCartCard;
