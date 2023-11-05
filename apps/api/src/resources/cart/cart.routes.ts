import { routeUtil } from 'utils';

import buy from './actions/buy';
import list from './actions/historyList';
import cartList from './actions/cartList';
import addToCart from './actions/addToCart';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([buy, list, cartList, addToCart]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
