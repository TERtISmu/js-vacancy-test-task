import { z } from 'zod';
import { productSchema } from 'resources/product';

const schema = z
  .object({
    _id: z.string(),

    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    email: z.string(),
    passwordHash: z.string().nullable().optional(),
    signupToken: z.string().nullable().optional(),
    resetPasswordToken: z.string().nullable().optional(),
    isEmailVerified: z.boolean().default(false),
    avatarUrl: z.string().nullable().optional(),
    oauth: z
      .object({
        google: z.boolean().default(false),
      })
      .optional(),
    // purchasedProducts: z.array(productSchema).default([]),
    purchasedProducts: z.array(z.string()).default([]),

    createdOn: z.date().optional(),
    updatedOn: z.date().optional(),
    lastRequest: z.date().optional(),
    deletedOn: z.date().optional().nullable(),
  })
  .strict();

export default schema;
