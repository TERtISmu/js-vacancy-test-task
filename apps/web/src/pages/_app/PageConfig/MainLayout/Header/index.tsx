import { memo, FC } from 'react';
import {
  ActionIcon,
  Avatar,
  Group,
  Header as LayoutHeader,
  Title,
} from '@mantine/core';
import { CartIcon, LogoutIcon, ShopyIcon } from 'public/icons';
import Link from 'next/link';

const Header: FC = () => (
  <LayoutHeader height="104px" ff="Inter" withBorder={false}>
    <Group mt={32} mb={32} mx={48} style={{ justifyContent: 'space-between' }}>
      <Group spacing={10}>
        <Avatar>
          <ShopyIcon />
        </Avatar>
        <Title order={2}>Shopy</Title>
      </Group>
      <Group spacing={32}>
        <Link
          href="#"
          style={{
            fontSize: '16px',
            color: '#201F22',
            fontWeight: '500',
            lineHeight: '32px',
            textDecoration: 'none',
            backgroundColor: '#ECECEE',
            borderRadius: '20px',
            padding: '2px 20px',
          }}
        >
          Marketplace
        </Link>
        <Link
          href="#"
          style={{
            fontSize: '16px',
            color: '#201F22',
            fontWeight: '500',
            lineHeight: '32px',
            textDecoration: 'none',
            backgroundColor: '#ECECEE',
            borderRadius: '20px',
            padding: '2px 20px',
          }}
        >
          Your Products
        </Link>
      </Group>
      <Group spacing={32}>
        <ActionIcon color="gray" variant="transparent" w={40} h={40}>
          <CartIcon />
        </ActionIcon>
        <ActionIcon color="gray" variant="transparent" w={40} h={40}>
          <LogoutIcon />
        </ActionIcon>
      </Group>
    </Group>
  </LayoutHeader>
);

export default memo(Header);
