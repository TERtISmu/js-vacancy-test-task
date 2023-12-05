import { z } from 'zod';

import { analyticsService } from 'services';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { productService, Product } from 'resources/product';

const schema = z.object({
  title: z.string().min(1, 'Please enter title').max(100),
  price: z.string({
    required_error: 'Price is required',
  }),
  photoUrl: z.string().nullable().optional(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { title, price, photoUrl } = ctx.validatedData;

  const priceNumber = Number(price);

  const isProductExists = await productService.exists({
    title,
    price: priceNumber,
    userId: user._id,
  });

  if (isProductExists) {
    await productService.atomic.updateOne(
      { title, price: priceNumber, userId: user._id },
      { $inc: { quantity: 1 } },
    );
  } else {
    await productService.insertOne({
      title,
      price: priceNumber,
      photoUrl,
      userId: user._id,
    });

    analyticsService.track('New product created', {
      title,
      price: priceNumber,
      photoUrl,
      userId: user._id,
    });
  }

  ctx.body = {};
}

export default (router: AppRouter) => {
  router.post('/your', validateMiddleware(schema), handler);
};
