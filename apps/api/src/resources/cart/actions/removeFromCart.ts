import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { userService } from 'resources/user';

const schema = z.object({
  productId: z.string(),
});

interface ValidatedData extends z.infer<typeof schema> {
  productId: string;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { productId } = ctx.validatedData;

  const index = user.productsInCart.findIndex((prod) => prod.id === productId);

  user.productsInCart.splice(index, 1);

  const updatedUser = userService.updateOne({ _id: user._id }, () => ({
    productsInCart: user.productsInCart,
  }));

  ctx.body = updatedUser;
}

export default (router: AppRouter) => {
  router.post('/removeFromCart', validateMiddleware(schema), handler);
};
