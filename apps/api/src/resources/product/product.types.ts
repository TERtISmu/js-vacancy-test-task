import { z } from 'zod';

import schema from './product.schema';

export enum ProductType {
  SOLD = 'sold',
  ONSALE = 'onsale',
}

export type Product = z.infer<typeof schema>;
