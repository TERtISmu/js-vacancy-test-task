import { Button, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { BalloonIcon } from 'public/icons';
import { FC } from 'react';
import { RoutePath } from 'routes';

const NothingHereYet: FC = () => {
  const router = useRouter();

  return (
    <Stack w={301} h={374} ml={500} spacing={20} align="center">
      <BalloonIcon />
      <Text
        style={{
          color: '#201F22',
          fontSize: '20px',
          fontFamily: 'Inter',
          fontWeight: '700',
        }}
      >
        Oops, there&apos;s nothing here yet!
      </Text>
      <Text
        style={{
          color: '#767676',
          fontSize: '14px',
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
        }}
      >
        You haven&apos;t madex any purchases yet.
        <br />
        Go to the marketplace and make purchases.
      </Text>
      <Button
        onClick={() => {
          router.push(RoutePath.Home);
        }}
        type="submit"
        fw={400}
        h={40}
        style={{
          borderRadius: '8px',
        }}
        color="#2B77EB"
        p="4px 20px"
      >
        <Text
          fw={500}
          c="white"
          style={{
            fontSize: '14px',
            fontFamily: 'Inter',
          }}
        >
          Go to Marketplace
        </Text>
      </Button>
    </Stack>
  );
};

export default NothingHereYet;
