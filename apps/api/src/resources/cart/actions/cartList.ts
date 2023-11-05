import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  ctx.body = {
    productsInCart: user.productsInCart,
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
