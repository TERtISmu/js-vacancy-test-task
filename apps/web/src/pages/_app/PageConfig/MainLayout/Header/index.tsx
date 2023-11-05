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
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Marketplace', href: RoutePath.Home },
  { label: 'Your Products', href: RoutePath.YourProducts },
];

const Header: FC = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const pathname = usePathname();

  return (
    <LayoutHeader height="104px" ff="Inter" withBorder={false}>
      <Group
        w={1345}
        mt={32}
        mb={32}
        mx="auto"
        style={{ justifyContent: 'space-between' }}
      >
        <Group spacing={6}>
          <Avatar>
            <ShopyIcon />
          </Avatar>
          <Title order={2} ff="Inter" style={{ fontSize: '29px' }}>
            Shopy
          </Title>
        </Group>
        <Group spacing={32} mr={16}>
          {navItems.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              style={{
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '32px',
                textDecoration: 'none',
                borderRadius: '20px',
                padding: '2px 20px',
                color: pathname === link.href ? '#201F22' : '#A3A3A3',
                backgroundColor: pathname === link.href ? '#ECECEE' : '#FFFFFF',
              }}
            >
              {link.label}
            </Link>
          ))}
        </Group>
        <Group spacing={32}>
          <ActionIcon color="gray" variant="transparent" w={40} h={40}>
            <CartIcon />
          </ActionIcon>
          <ActionIcon
            color="gray"
            variant="transparent"
            w={40}
            h={40}
            onClick={() => signOut()}
          >
            <LogoutIcon />
          </ActionIcon>
        </Group>
      </Group>
    </LayoutHeader>
  );
};

export default memo(Header);
