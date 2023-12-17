import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { cartApi } from 'resources/cart';
import { RoutePath } from 'routes';

interface SummaryProps {
  totalPrice: number | undefined;
}

const Summary: FC<SummaryProps> = ({ totalPrice }) => {
  const { mutate: buy } = cartApi.useBuy();

  const router = useRouter();

  const handlerBuy = async () => {
    buy();
    router.push(RoutePath.PaymentSuccessfus);
  };

  return (
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
        onClick={handlerBuy}
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
  );
};

export default Summary;
