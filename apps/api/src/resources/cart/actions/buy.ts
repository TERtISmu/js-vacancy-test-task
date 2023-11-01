import { z } from 'zod';

import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { productService, Product, ProductType } from 'resources/product';
import { userService } from 'resources/user';
// import { productSchema } from 'resources/product';

const schema = z.object({
  products: z.string().array(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { products } = ctx.validatedData;

  // const productsIds = products.map((product) => product._id);

  // await productService.decrementNumber(productsIds);
  for (let i = 0; i < products.length; i++) {
    const product = await productService.findOne({ _id: products[i] });
    if (product?.quantity === 1) {
      productService.atomic.updateOne(
        { _id: product?._id },
        {
          $set: {
            status: ProductType.SOLD,
            lastRequest: new Date(),
          },
        },
      );
      await productService.decrementNumber(products[i]);
    } else {
      await productService.decrementNumber(products[i]);
    }
  }

  const updatedUser = userService.updateOne({ _id: user._id }, () => ({
    purchasedProducts: [...products],
  }));

  ctx.body = updatedUser;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
