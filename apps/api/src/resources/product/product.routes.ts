import { routeUtil } from 'utils';

import list from './actions/list';
import yourList from './actions/your-list';
import remove from './actions/remove';
import add from './actions/add';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([list, yourList, remove, add]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
