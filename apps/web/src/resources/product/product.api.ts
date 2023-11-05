import queryClient from 'query-client';
import { useMutation, useQuery } from 'react-query';

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

export function useYourList<T>(params: T) {
  const list = () => apiService.get('/products/your', params);

  interface UserListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<UserListResponse>(['products', params], list);
}

export function useAdd<T>() {
  const add = (data: T) => apiService.post('/products/your', data);

  return useMutation<Product, unknown, T>(add, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}

export function useRemove(id: string) {
  const remove = () => apiService.delete(`/products/your/${id}`);

  return useMutation<Product>(remove, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}
