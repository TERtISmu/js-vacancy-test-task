import Head from 'next/head';
import { NextPage } from 'next';
import {
  SimpleGrid,
  Stack,
  Title,
  UnstyledButton,
  Text,
  Center,
} from '@mantine/core';
import Link from 'next/link';

import { YourProductCard } from 'components';
import { NewProductPlusIcon } from 'public/icons';

const YourProducts: NextPage = () => (
  <>
    <Head>
      <title>Your Products</title>
    </Head>
    <Stack w={1345} m="auto" spacing={20}>
      <Title c="#201F22" ff="Inter" fw={600} size="20px">
        Your Products
      </Title>
      <SimpleGrid w={1144} cols={4} spacing={20} verticalSpacing={20}>
        <UnstyledButton
          style={{ borderRadius: '12px', border: '1px solid #ECECEE' }}
        >
          <Link href="/create-new-product" style={{ textDecoration: 'none' }}>
            <Center>
              <Stack align="center" spacing={12}>
                <NewProductPlusIcon />
                <Text c="#2B77EB" size={20} fw={400}>
                  New Product
                </Text>
              </Stack>
            </Center>
          </Link>
        </UnstyledButton>
        <YourProductCard
          imageSrc="images/DJI-Pocket-2-Creator-Combo.png"
          productName="DJI Mini 3 Pro (DJI RC)"
          productPrice="1,158"
          productStatus="On sale"
        />
        <YourProductCard
          imageSrc="images/DJI-RS-3.png"
          productName="DJI RS 3"
          productPrice="549"
          productStatus="Sold"
        />
      </SimpleGrid>
    </Stack>
  </>
);

export default YourProducts;
