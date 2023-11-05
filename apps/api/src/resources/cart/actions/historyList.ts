import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  ctx.body = {
    purchasedProducts: user.purchasedProducts,
  };
}

export default (router: AppRouter) => {
  router.get('/history', handler);
};
