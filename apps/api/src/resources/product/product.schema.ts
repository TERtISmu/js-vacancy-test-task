import { z } from 'zod';

import { ProductType } from './product.types';

const schema = z
  .object({
    _id: z.string(),

    title: z.string(),
    price: z.number(),
    status: z.nativeEnum(ProductType).default(ProductType.ONSALE),
    quantity: z.number().nonnegative().default(1),
    userId: z.string(),
    photoUrl: z.string().nullable().optional(),

    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    lastRequest: z.date().optional(),
    deletedOn: z.date().optional().nullable(),
  })
  .strict();

export default schema;
