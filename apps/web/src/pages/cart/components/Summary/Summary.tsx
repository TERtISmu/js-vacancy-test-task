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
        backgroundColor: '#FFFFFF',
      }}
    >
      <Title
        size={20}
        fw={700}
        c="#201F22"
      >
        Summary
      </Title>
      <Divider />
      <Group position="apart">
        <Text
          size={16}
          fw={400}
          c="#767676"
        >
          Total price
        </Text>
        <Text
          size={16}
          fw={700}
          c="#201F22"
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
          size={14}
          fw={500}
          c="#FFFFFF"
        >
          Proceed to Ckeckout
        </Text>
      </Button>
    </Stack>
  );
};

export default Summary;
