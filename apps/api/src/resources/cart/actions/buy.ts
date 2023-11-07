import { AppKoaContext, AppRouter } from 'types';
import { productService, ProductType } from 'resources/product';
import { userService } from 'resources/user';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const userProductsIds = user.productsInCart.map((prod) => {
    return prod.id;
  });

  for (let i = 0; i < userProductsIds.length; i++) {
    const isProductExists = await productService.exists({
      _id: userProductsIds[i],
    });

    if (isProductExists) {
      const product = await productService.findOne({ _id: userProductsIds[i] });

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
        await productService.decrementNumber(
          userProductsIds[i],
          user.productsInCart[i].quantityInCart,
        );
      } else {
        await productService.decrementNumber(
          userProductsIds[i],
          user.productsInCart[i].quantityInCart,
        );
      }
    }
  }

  const productInfo = user.productsInCart.map((prod) => {
    return {
      id: prod.id,
      title: prod.title,
      price: prod.price,
      purchaseDate: new Date(),
    };
  });

  const updatedUser = userService.updateOne({ _id: user._id }, () => ({
    purchasedProducts: [...user.purchasedProducts, ...productInfo],
    productsInCart: [],
  }));

  ctx.body = updatedUser;
}

export default (router: AppRouter) => {
  router.post('/', handler);
};
