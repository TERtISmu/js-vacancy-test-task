import { routeUtil } from 'utils';

import buy from './actions/buy';
import list from './actions/historyList';
import cartList from './actions/cartList';
import addToCart from './actions/addToCart';
import removeFromCart from './actions/removeFromCart';
import changeAmountInCart from './actions/changeAmountInCart';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([
  buy,
  list,
  cartList,
  addToCart,
  removeFromCart,
  changeAmountInCart,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
