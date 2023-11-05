import Head from 'next/head';
import { NextPage } from 'next';
import { Stack, Title, Group, Button, TextInput, Text } from '@mantine/core';

import { UploadPhotoIcon } from 'public/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { productApi } from 'resources/product';
import { useQueryClient } from 'react-query';
import { handleError } from 'utils';

const schema = z.object({
  title: z.string().min(1, 'Please enter product title').max(100),
  price: z.string().min(1, 'Please enter product title').max(100),
});

type ProductParams = z.infer<typeof schema>;

const CreateNewProduct: NextPage = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductParams>({
    resolver: zodResolver(schema),
  });

  const { mutate: AddProduct, isLoading: isUpdateLoading } = productApi.useAdd<ProductParams>();

  const onSubmit = (submitData: ProductParams) => AddProduct(submitData, {
    onSuccess: (data) => {
      queryClient.setQueryData(['currentProduct'], data);
      showNotification({
        title: 'Success',
        message: 'Your product has been successfully added.',
        color: 'green',
      });
    },
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Create new product</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w={694} ml={96} spacing={20}>
          <Title c="#201F22" ff="Inter" fw={600} size="20px">
            Create new product
          </Title>
          <Group spacing={16}>
            <UploadPhotoIcon />
            <Button
              variant="default"
              p="4px 20px"
              c="#767676"
              ff="Inter"
              style={{
                border: '1px #CFCFCF solid',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              Upload Photo
            </Button>
          </Group>
          <TextInput
            {...register('title')}
            placeholder="Enter title of the product..."
            label="Title of the product"
            labelProps={{
              'data-invalid': !!errors.title,
            }}
            error={errors.title?.message}
            styles={() => ({
              label: {
                fontSize: '16px',
                fontFamily: 'Inter',
                marginBottom: '11px',
              },
              input: {
                height: '40px',
                padding: '0 14px',
                fontFamily: 'Inter',
                fontSize: '16px',
              },
            })}
          />
          <TextInput
            {...register('price')}
            placeholder="Enter price of the product"
            label="Price"
            labelProps={{
              'data-invalid': !!errors.price,
            }}
            error={errors.price?.message}
            styles={() => ({
              label: {
                fontSize: '16px',
                fontFamily: 'Inter',
                marginBottom: '11px',
              },
              input: {
                height: '40px',
                padding: '0 14px',
                fontFamily: 'Inter',
                fontSize: '16px',
              },
            })}
          />
          <Button
            type="submit"
            loading={isUpdateLoading}
            mt={8}
            ml="auto"
            fw={400}
            h={40}
            style={{
              borderRadius: '8px',
            }}
            color="#2B77EB"
            p="4px 20px"
            w={145}
          >
            <Text
              fw={500}
              c="white"
              style={{
                fontSize: '14px',
                fontFamily: 'Inter',
              }}
            >
              Upload Product
            </Text>
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default CreateNewProduct;
