import {
  ActionIcon,
  BackgroundImage,
  Badge,
  Card,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { FC } from 'react';

import { TrashCanIcon } from 'public/icons';

interface YourProductCardProps {
  imageSrc: string;
  productName: string;
  productPrice: number;
  productStatus: string;
}

const YourProductCard: FC<YourProductCardProps> = ({
  imageSrc,
  productName,
  productPrice,
  productStatus,
}) => {
  console.log('hello');
  return (
    <Card withBorder style={{ borderRadius: '12px' }} p={15}>
      <Card.Section>
        <BackgroundImage src={imageSrc} w={271} h={174}>
          <ActionIcon
            variant="light"
            radius={8}
            w={32}
            h={32}
            p={2}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <TrashCanIcon />
          </ActionIcon>
          <Badge
            p="0 12px"
            style={{
              position: 'absolute',
              bottom: '106px',
              right: '12px',
            }}
          >
            {productStatus}
          </Badge>
        </BackgroundImage>
      </Card.Section>

      <Stack justify="flex-start" spacing={0} p={2}>
        <Text
          mt={12}
          fw={700}
          style={{ fontSize: '20px', fontFamily: 'Inter' }}
          size="sm"
        >
          {productName}
        </Text>

        <Group mt={8} position="apart">
          <Text
            fw={500}
            c="#A3A3A3"
            style={{ fontSize: '14px', fontFamily: 'Inter' }}
          >
            Price:
          </Text>
          <Text
            c="#201F22"
            fw={700}
            style={{ fontSize: '20px', fontFamily: 'Inter' }}
            mr={2}
          >
            $
            {productPrice}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};

export default YourProductCard;
