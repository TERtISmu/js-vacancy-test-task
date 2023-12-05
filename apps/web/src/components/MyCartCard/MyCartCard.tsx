import { ActionIcon, Group, Text, UnstyledButton } from '@mantine/core';
import { CrossRemoveIcon, MinusIcon, PlusIcon } from 'public/icons';
import { FC, useState } from 'react';
import { cartApi } from 'resources/cart';
import { InCartProduct } from 'resources/user/user.types';

interface ProductCardProps {
  productInfo: InCartProduct;
}

const MyCartCard: FC<ProductCardProps> = ({ productInfo }) => {
  const { id, title, price, quantityInCart, photoUrl } = productInfo;

  const { mutate: removeFromCart } = cartApi.useRemoveFromCart();
  const { mutate: changeAmount } = cartApi.useChangeAmount();

  const [amount, setAmount] = useState(quantityInCart);

  const handlerRemoveFromCart = async () => {
    await removeFromCart({ productId: id });
    window.location.reload();
  };

  const handlerDecreaseAmount = async () => {
    await changeAmount(
      { productId: id, operation: 'dec' },
      {
        onSuccess: (response: any) => {
          if (response.updatedAmount) setAmount(response.updatedAmount);
        },
      },
    );
  };

  const handlerIncreaseAmount = async () => {
    await changeAmount(
      { productId: id, operation: 'inc' },
      {
        onSuccess: (response: any) => {
          if (response.updatedAmount) setAmount(response.updatedAmount);
        },
      },
    );
  };

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
      <Text w={144} ta="right">
        $
        {price}
      </Text>
      <Group w={144} position="right" spacing={12}>
        <ActionIcon onClick={handlerDecreaseAmount}>
          <MinusIcon />
        </ActionIcon>
        {amount}
        <ActionIcon onClick={handlerIncreaseAmount}>
          <PlusIcon />
        </ActionIcon>
      </Group>
      <UnstyledButton w={144} onClick={handlerRemoveFromCart}>
        <Group spacing={0} position="right">
          <ActionIcon>
            <CrossRemoveIcon />
          </ActionIcon>
          <Text
            style={{
              color: '#767676',
              fontSize: '16px',
              fontFamily: 'Inter',
              fontWeight: '400',
            }}
          >
            Remove
          </Text>
        </Group>
      </UnstyledButton>
    </Group>
  );
};

export default MyCartCard;
