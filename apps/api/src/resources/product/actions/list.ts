import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { productService } from 'resources/product';
import { ProductType } from 'resources/product/product.types';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']),
    })
    .default({ createdOn: 'desc' }),
  filter: z
    .object({
      price: z
        .object({
          minPrice: z.string(),
          maxPrice: z.string(),
        })
        .nullable()
        .default(null),
    })
    .nullable()
    .default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;

  const validatedSearch = searchValue
    .split('\\')
    .join('\\\\')
    .split('.')
    .join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const products = await productService.find(
    {
      $and: [
        {
          $or: [{ title: { $regex: regExp } }, { createdOn: {} }],
        },
        filter?.price
          ? {
            price: {
              $gte: +filter.price.minPrice,
              $lt: +filter.price.maxPrice,
            },
          }
          : {},
        { status: ProductType.ONSALE },
      ],
    },
    { page, perPage },
    { sort },
  );

  ctx.body = {
    items: products.results,
    totalPages: products.pagesCount,
    count: products.count,
  };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
