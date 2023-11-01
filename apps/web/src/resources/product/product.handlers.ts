import queryClient from 'query-client';
import { apiService, socketService } from 'services';

import { Product } from './product.types';

apiService.on('error', (error: any) => {
  if (error.status === 401) {
    queryClient.setQueryData(['account'], null);
  }
});

socketService.on('connect', () => {
  const account = queryClient.getQueryData(['account']) as Product;

  socketService.emit('subscribe', `product-${account._id}`);
});

socketService.on('product:updated', (data: Product) => {
  queryClient.setQueryData(['account'], data);
});
