import { z } from 'zod';

import { analyticsService } from 'services';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { productService, Product } from 'resources/product';

const schema = z.object({
  title: z.string().min(1, 'Please enter title').max(100),
  price: z.string().min(1, 'Please enter price').max(100),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { title, price } = ctx.validatedData;

  const product = await productService.insertOne({
    title,
    price,
    userId: user._id,
  });

  analyticsService.track('New user created', {
    title,
    price,
    userId: user._id,
  });

  ctx.body = product;
}

export default (router: AppRouter) => {
  router.post('/your', validateMiddleware(schema), handler);
};
