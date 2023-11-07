import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter, Next } from 'types';
import { userService } from 'resources/user';
import { productService } from 'resources/product';

export enum OperationType {
  INC = 'inc',
  DEC = 'dec',
}

const schema = z.object({
  productId: z.string(),
  operation: z.nativeEnum(OperationType),
});

interface ValidatedData extends z.infer<typeof schema> {
  productId: string;
  operation: OperationType;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productId } = ctx.validatedData;

  const isProductExists = await productService.exists({ _id: productId });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { productId, operation } = ctx.validatedData;

  const productInDB = await productService.findOne({ _id: productId });

  const updatedCart = user.productsInCart;

  let updatedAmount = user.productsInCart.find((p) => p.id === productId)?.quantityInCart;

  if (operation === OperationType.INC) {
    console.log('inc');
    updatedCart.forEach((prod) => {
      if (
        prod.id === productId &&
        prod.quantityInCart + 1 <= productInDB?.quantity
      ) {
        prod.quantityInCart += 1;
        updatedAmount = prod.quantityInCart;
      }
    });
  } else {
    updatedCart.forEach((prod) => {
      if (prod.id === productId && prod.quantityInCart >= 2) {
        prod.quantityInCart -= 1;
        updatedAmount = prod.quantityInCart;
      }
    });
  }

  await userService.updateOne({ _id: user._id }, () => ({
    productsInCart: updatedCart,
  }));

  ctx.body = { updatedAmount };
}

export default (router: AppRouter) => {
  router.post('/change-amount', validateMiddleware(schema), validator, handler);
};
