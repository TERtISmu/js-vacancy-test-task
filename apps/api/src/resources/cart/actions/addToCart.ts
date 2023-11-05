import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { Product } from 'resources/product';
import { userService } from 'resources/user';
import { productSchema } from 'resources/product';

interface ValidatedData extends z.infer<typeof productSchema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const product = ctx.validatedData;

  const updatedUser = userService.updateOne({ _id: user._id }, () => ({
    productsInCart: [...user.productsInCart, product],
  }));

  ctx.body = updatedUser;
}

export default (router: AppRouter) => {
  router.post('/addToCart', validateMiddleware(productSchema), handler);
};
