import Head from 'next/head';
import { NextPage } from 'next';
import { Stack, Title, Group, Button, TextInput, Text } from '@mantine/core';

import { UploadPhotoIcon } from 'public/icons';

const CreateNewProduct: NextPage = () => (
  <>
    <Head>
      <title>Create new product</title>
    </Head>
    <form>
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
          placeholder="Enter title of the product..."
          label="Title of the product"
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
          placeholder="Enter price of the product"
          label="Price"
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

export default CreateNewProduct;
