import Head from 'next/head';
import { useState } from 'react';
import { NextPage } from 'next';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Stack, Title, Group, Button, TextInput, Text, Box } from '@mantine/core';

import { UploadPhotoIcon } from 'public/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { productApi } from 'resources/product';
import { useQueryClient } from 'react-query';
import { handleError } from 'utils';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import config from 'config';
import { accountApi } from 'resources/account';

const schema = z.object({
  title: z.string().min(1, 'Please enter product title').max(100),
  price: z.string().min(1, 'Please enter product title').max(100),
  photoUrl: z.string().nullable().optional(),
});
type ProductParams = z.infer<typeof schema>;

const CreateNewProduct: NextPage = () => {
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imageUploadError, setImageUploadError] = useState<boolean | string>(
    false,
  );

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
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

  const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const { data } = accountApi.useGet();

  const storeImage = async (file: FileWithPath) => {
    await signInWithEmailAndPassword(
      auth,
      config.FIREBASE_USER,
      config.FIREBASE_AUTH,
    );

    return new Promise<string>((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `productImages/${data?._id}-${Date.now()}-${file.name}`;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length) {
      setUploading(true);
      setImageUploadError(false);

      storeImage(files[0]).then((url) => {
        register('photoUrl');
        setValue('photoUrl', url);
        setImageUploadError(false);
        setUploading(false);
      })
        .catch(() => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You should upload at least one image');
      setUploading(false);
    }
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    setFiles([imageFile]);
  };

  return (
    <>
      <Head>
        <title>Create new product</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w={694} ml={96} spacing={20}>
          <Title c="#201F22" fw={600} size="20px">
            Create new product
          </Title>
          <Group spacing={16}>
            <Dropzone
              name="avatarUrl"
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              onDrop={handlePhotoUpload}
              p={0}
              style={{ border: '0' }}
            >
              {getValues().photoUrl ? (
                <Box w={180} h={180}>
                  <img
                    src={getValues()?.photoUrl || ''}
                    alt={getValues().title}
                    style={{
                      width: '180px',
                      height: '100%',
                    }}
                  />
                </Box>
              ) : (
                <UploadPhotoIcon />
              )}
            </Dropzone>
            <Button
              disabled={uploading}
              onClick={handleImageSubmit}
              variant="default"
              p="4px 20px"
              c="#767676"
              style={{
                border: '1px #CFCFCF solid',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
          </Group>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
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
                marginBottom: '11px',
              },
              input: {
                height: '40px',
                padding: '0 14px',
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
                marginBottom: '11px',
              },
              input: {
                height: '40px',
                padding: '0 14px',
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
            color="#2B77EB"
            p="4px 20px"
            w={145}
            style={{
              borderRadius: '8px',
            }}
          >
            <Text
              size={14}
              fw={500}
              c="#FFFFFF"
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
