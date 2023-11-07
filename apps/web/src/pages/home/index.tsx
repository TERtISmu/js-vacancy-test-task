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
import { IconX } from '@tabler/icons-react';

import { useDebouncedValue, useInputState } from '@mantine/hooks';
import {
  ArrowDownIcon,
  SearchIcon,
  SortDirectionIcon,
  CloseIcon,
  FilterCloseIcon,
} from 'public/icons';

import { ProductCard } from 'components';
import { productApi } from 'resources/product';
import { ChangeEvent, useCallback, useLayoutEffect, useState } from 'react';

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
    price?: {
      minPrice: number | null;
      maxPrice: number | null;
    };
  };
}

const PER_PAGE = 6;

const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);
  const [params, setParams] = useState<UsersListParams>({});
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Number.MAX_SAFE_INTEGER);
  const [stringMinPrice, setStringMinPrice] = useInputState('');
  const [stringMaxPrice, setStringMaxPrice] = useInputState('');

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handlePagination = useCallback((currentPage: any) => {
    setPage(currentPage);
    setParams((prev) => ({
      ...prev,
      page: currentPage,
    }));
  }, []);

  const handleMinPriceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setStringMinPrice(value);
      const newPrice = value === '' ? 0 : Number(value);
      setMinPrice(newPrice);
      setParams((prev) => ({
        ...prev,
        filter: { price: { minPrice: newPrice, maxPrice } },
      }));
    },
    [setStringMinPrice, maxPrice],
  );

  const handleMaxPriceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setStringMaxPrice(value);
      const newPrice = value === '' ? Number.MAX_SAFE_INTEGER : Number(value);
      setMaxPrice(newPrice);
      setParams((prev) => ({
        ...prev,
        filter: { price: { minPrice, maxPrice: newPrice } },
      }));
    },
    [setStringMaxPrice, minPrice],
  );

  const handleResetFilter = useCallback(() => {
    setMinPrice(0);
    setMaxPrice(Number.MAX_SAFE_INTEGER);
    setParams((prev) => ({
      ...prev,
      filter: { price: { minPrice: 0, maxPrice: Number.MAX_SAFE_INTEGER } },
    }));
    setStringMinPrice('');
    setStringMaxPrice('');
  }, [setStringMaxPrice, setStringMinPrice]);

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
            {(minPrice !== 0 || maxPrice !== Number.MAX_SAFE_INTEGER) && (
              <Group spacing={5}>
                <UnstyledButton onClick={handleResetFilter}>
                  <Group spacing={2}>
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
                </UnstyledButton>
              </Group>
            )}
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
            <Input
              placeholder="From:"
              fw={500}
              c="#A3A3A3"
              styles={(theme) => ({
                input: {
                  width: '131px',
                  '&:focus-within': {
                    borderColor: theme.colors.blue[7],
                  },
                  border: '1px #ECECEE solid',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                },
              })}
              value={stringMinPrice}
              onChange={handleMinPriceChange}
            />
            <Input
              placeholder="To:"
              fw={500}
              c="#A3A3A3"
              styles={(theme) => ({
                input: {
                  width: '131px',
                  '&:focus-within': {
                    borderColor: theme.colors.blue[7],
                  },
                  border: '1px #ECECEE solid',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                },
              })}
              value={stringMaxPrice}
              onChange={handleMaxPriceChange}
            />
          </Group>
        </Stack>
        <Stack spacing={20}>
          <Input
            icon={<SearchIcon />}
            value={search}
            onChange={handleSearch}
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
            rightSection={
              search ? (
                <UnstyledButton
                  onClick={() => setSearch('')}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconX color="gray" />
                </UnstyledButton>
              ) : null
            }
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
            {(minPrice !== 0 || maxPrice !== Number.MAX_SAFE_INTEGER) && (
              <Group spacing={5}>
                <UnstyledButton
                  onClick={handleResetFilter}
                  w={150}
                  style={{
                    border: '1px #ECECEE solid',
                    borderRadius: '31px',
                    padding: '6px 20px',
                  }}
                >
                  <Group position="apart" spacing={8}>
                    <Text
                      w={65.5}
                      fw={500}
                      style={{ fontSize: '14px', fontFamily: 'Inter' }}
                    >
                      {`$${stringMinPrice === '' ? 0 : stringMinPrice}-${
                        stringMaxPrice === '' ? '' : `$${stringMaxPrice}`
                      }`}
                    </Text>
                    <CloseIcon />
                  </Group>
                </UnstyledButton>
              </Group>
            )}
          </Stack>
          <SimpleGrid h={771} cols={3} spacing={20} verticalSpacing={20}>
            {data?.items.length ? (
              data.items.map((product) => <ProductCard productInfo={product} />)
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
