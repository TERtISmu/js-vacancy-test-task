import { Avatar, Group, SimpleGrid, Stack, Title, Text } from '@mantine/core';
import { ShopyIcon } from 'public/icons';
import { FC, ReactElement } from 'react';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={2}>
    {children}
    <Stack
      sx={{
        width: '656px',
        height: '896px',
        background: '#F4F4F4',
        border: '1px none rgb(189, 189, 189)',
        borderRadius: '12px',
      }}
      mt="32px"
      mx="auto"
      mb="32px"
    >
      <Group spacing={10} mt={40} ml={40}>
        <Avatar>
          <ShopyIcon />
        </Avatar>
        <Title order={2}>Shopy</Title>
      </Group>
      <Stack w={460} ml={32} spacing={12} mt={570}>
        <Title order={1}>Sell and buy products super quickly!</Title>
        <Text size={20} fw={400} c="#201F22">
          Save your time, we take care of all the processing.
        </Text>
        <Group spacing={20}>
          <Avatar.Group>
            <Avatar
              src="./icons/start-page-avatar1.svg"
              alt="start-page-avatar1"
              style={{
                borderRadius: '60px',
              }}
            />
            <Avatar
              src="./icons/start-page-avatar2.svg"
              alt="start-page-avatar2"
              style={{
                borderRadius: '60px',
              }}
            />
            <Avatar
              src="./icons/start-page-avatar3.svg"
              alt="start-page-avatar3"
              style={{
                borderRadius: '60px',
              }}
            />
            <Avatar
              src="./icons/start-page-avatar4.svg"
              alt="start-page-avatar4"
              style={{
                borderRadius: '60px',
              }}
            />
            <Avatar
              src="./icons/start-page-avatar5.svg"
              alt="start-page-avatar5"
              style={{
                borderRadius: '60px',
              }}
            />
          </Avatar.Group>
          <Group spacing={4}>
            <Text size={16} fw={700}>
              +100
            </Text>
            <Text fw={400} size={16}>
              users from all over the world
            </Text>
          </Group>
        </Group>
      </Stack>
    </Stack>
  </SimpleGrid>
);

export default UnauthorizedLayout;
