import { useQuery } from 'react-query';

import { apiService } from 'services';

import { Product } from './product.types';

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface UserListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<UserListResponse>(['products', params], list);
}
