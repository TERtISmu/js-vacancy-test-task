import Head from 'next/head';
import { NextPage } from 'next';
import {
  Group,
  SimpleGrid,
  Stack,
  Title,
  Text,
  Input,
  UnstyledButton,
  Pagination,
  Center,
  Container,
  Select,
  SelectItem,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {
  ArrowDownIcon,
  SearchIcon,
  SortDirectionIcon,
  CloseIcon,
  FilterCloseIcon,
} from 'public/icons';

import { ProductCard } from 'components';
import { productApi } from 'resources/product';
import { useCallback, useLayoutEffect, useState } from 'react';

const selectOptions: SelectItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
];

interface UsersListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn: 'asc' | 'desc';
  };
  filter?: {
    createdOn?: {
      sinceDate: Date | null;
      dueDate: Date | null;
    };
  };
}

const PER_PAGE = 6;

const Home: NextPage = () => {
  const [search] = useState('');
  const [activePage, setPage] = useState(1);
  const [params, setParams] = useState<UsersListParams>({});
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [sortBy, setSortBy] = useState(selectOptions[0].value);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handlePagination = useCallback((currentPage: any) => {
    setPage(currentPage);
    setParams((prev) => ({
      ...prev,
      page: currentPage,
    }));
  }, []);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      searchValue: debouncedSearch,
      perPage: PER_PAGE,
    }));
  }, [debouncedSearch]);
  const { data } = productApi.useList(params);

  return (
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
          <Stack spacing={12}>
            <Group position="apart" spacing={0}>
              <Text fw={700} ff="Inter">
                {`${data?.count} results`}
              </Text>
              <Select
                h={20}
                w={140}
                p={0}
                style={{ fontFamily: 'Inter', fontSize: '14px' }}
                size="14px"
                data={selectOptions}
                value={sortBy}
                onChange={handleSort}
                variant="unstyled"
                icon={<SortDirectionIcon />}
                iconWidth={30}
                rightSection={<ArrowDownIcon />}
                withinPortal={false}
                transitionProps={{
                  transition: 'pop-bottom-right',
                  duration: 210,
                  timingFunction: 'ease-out',
                }}
              />
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
            {data?.items.length ? (
              data.items.map((product) => (
                <ProductCard
                  imageSrc="images/DJI-RS-3.png"
                  productName={product.title}
                  productPrice={product.price}
                />
              ))
            ) : (
              <Container p={75}>
                <Text size="xl" color="grey">
                  No results found, try to adjust your search.
                </Text>
              </Container>
            )}
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
      <Center>
        <Pagination
          total={3}
          mt={31}
          mb={32}
          value={activePage}
          onChange={handlePagination}
        />
      </Center>
    </>
  );
};

export default Home;
