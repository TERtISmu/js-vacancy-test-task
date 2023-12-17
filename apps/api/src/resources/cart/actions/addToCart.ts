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

  let updatedCart = user.productsInCart;

  const isAlreadyInCart = user.productsInCart.find((prod) => prod.id === product._id);

  if (isAlreadyInCart) {
    updatedCart.forEach((prod) => {
      if (prod.id === product._id && product.quantity > prod.quantityInCart) {
        prod.quantityInCart += 1;
      }
    });
  } else {
    updatedCart = [
      ...updatedCart,
      {
        id: product._id,
        title: product.title,
        price: product.price,
        quantityInCart: 1,
        photoUrl: product.photoUrl || '',
      },
    ];
  }

  const updatedUser = userService.updateOne({ _id: user._id }, () => ({
    productsInCart: updatedCart,
  }));

  ctx.body = updatedUser;
}

export default (router: AppRouter) => {
  router.post('/addToCart', validateMiddleware(productSchema), handler);
};
