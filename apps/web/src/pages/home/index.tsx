import Head from 'next/head';
import { NextPage } from 'next';
import {
  Group,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Input,
  Button,
  UnstyledButton,
  Pagination,
  Center,
} from '@mantine/core';
import {
  ArrowDownIcon,
  SearchIcon,
  SortDirectionIcon,
  CloseIcon,
  FilterCloseIcon,
} from 'public/icons';

import { ProductCard } from 'components';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <SimpleGrid
      w={1345}
      cols={2}
      spacing={28}
      style={{ gridTemplateColumns: '315px 1001px' }}
      m="auto"
    >
      <Stack
        w={315}
        h={163}
        p={18}
        justify="flex-start"
        spacing={1}
        style={{
          border: '1px #ECECEE solid',
          borderRadius: '12px',
        }}
      >
        <Group spacing="auto" position="apart">
          <Title order={3} size={20} fw={700} style={{ fontFamily: 'Inter' }}>
            Filters
          </Title>
          <Group spacing={5}>
            <Text
              c="#A3A3A3"
              fw={500}
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              Reset All
            </Text>
            <FilterCloseIcon />
          </Group>
        </Group>
        <Text
          style={{
            fontWeight: '700',
            fontSize: '16px',
            marginTop: '28px',
            marginBottom: '8px',
            fontFamily: 'Inter',
          }}
        >
          Price
        </Text>
        <Group spacing={12}>
          <Group
            w={131}
            spacing={4}
            style={{
              border: '1px #ECECEE solid',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          >
            <Text
              c="#A3A3A3"
              fw={500}
              style={{ fontFamily: 'Inter', fontSize: '14px' }}
            >
              From:
            </Text>
            <Text fw={500} style={{ fontSize: '14px', fontFamily: 'Inter' }}>
              400$
            </Text>
          </Group>
          <Group
            w={131}
            spacing={4}
            style={{
              border: '1px #ECECEE solid',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          >
            <Text
              c="#A3A3A3"
              fw={500}
              style={{ fontFamily: 'Inter', fontSize: '14px' }}
            >
              To:
            </Text>
            <Text fw={500} style={{ fontSize: '14px', fontFamily: 'Inter' }}>
              1500$
            </Text>
          </Group>
        </Group>
      </Stack>
      <Stack spacing={20}>
        <Input
          icon={<SearchIcon />}
          placeholder="Type to search..."
          styles={(theme) => ({
            input: {
              height: '48px',
              width: '1001px',
              '&:focus-within': {
                borderColor: theme.colors.blue[7],
              },
              fontFamily: 'Inter',
              fontSize: '14px',
            },
          })}
        />
        {/* <Stack> */}
        <Stack spacing={12}>
          <Group position="apart" spacing={0}>
            <Text fw={700} ff="Inter">
              12 results
            </Text>
            <Button
              h={21}
              p={0}
              leftIcon={<SortDirectionIcon />}
              rightIcon={<ArrowDownIcon />}
              bg="white"
              c="#201F22"
              style={{ fontFamily: 'Inter', fontSize: '14px' }}
              styles={() => ({
                leftIcon: {
                  marginRight: '6px',
                },
                rightIcon: {
                  marginLeft: '7px',
                },
                '&:not([data-disabled])': {
                  background: '#0A0A0A',
                },
              })}
            >
              Sort by newest
            </Button>
          </Group>
          <UnstyledButton>
            <Group
              position="apart"
              spacing={8}
              w={150}
              style={{
                border: '1px #ECECEE solid',
                borderRadius: '31px',
                padding: '6px 20px',
              }}
            >
              <Text
                w={65.5}
                fw={500}
                style={{ fontSize: '14px', fontFamily: 'Inter' }}
              >
                $400-$1500
              </Text>
              <CloseIcon />
            </Group>
          </UnstyledButton>
        </Stack>
        <SimpleGrid cols={3} spacing={20} verticalSpacing={20}>
          <ProductCard
            imageSrc="images/DJI-Air-3.png"
            productName="DJI Air 3"
            productPrice="1,549"
          />
          <ProductCard
            imageSrc="images/DJI-Osmo-Action-4.png"
            productName="DJI Osmo Action 4"
            productPrice="499"
          />
          <ProductCard
            imageSrc="images/DJI-Mini-3-Pro-(DJI-RC).png"
            productName="DJI Mini 3 Pro (DJI RC)"
            productPrice="1,158"
          />
          <ProductCard
            imageSrc="images/DJI-Mini-3-Pro.png"
            productName="DJI Mini 3 Pro"
            productPrice="909"
          />
          <ProductCard
            imageSrc="images/DJI-Pocket-2-Creator-Combo.png"
            productName="DJI Pocket 2 Creator Combo"
            productPrice="499"
          />
          <ProductCard
            imageSrc="images/DJI-RS-3.png"
            productName="DJI RS 3"
            productPrice="549"
          />
        </SimpleGrid>
      </Stack>
      {/* </Stack> */}
    </SimpleGrid>
    <Center>
      <Pagination total={3} mt={31} mb={32} />
    </Center>
  </>
);

export default Home;
