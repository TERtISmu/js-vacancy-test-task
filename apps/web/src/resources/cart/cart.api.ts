import queryClient from 'query-client';
import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';

import { PusrchasedProduct, InCartProduct } from 'resources/user/user.types';

export function useList() {
  const list = () => apiService.get('/cart');

  interface CartListResponse {
    productsInCart: InCartProduct[];
  }

  return useQuery<CartListResponse>(['cart'], list);
}

export function useAddToCart<T>() {
  const addToCart = (data: T) => apiService.post('/cart/addToCart', data);

  return useMutation<{}, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}

export function useRemoveFromCart<T>() {
  const removeFromCart = (data: T) => apiService.post('/cart/removeFromCart', data);

  return useMutation<{}, unknown, T>(removeFromCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}

export function useChangeAmount<T>() {
  const changeAmount = (data: T) => apiService.post('/cart/change-amount', data);

  interface ChangeAmountResponse {
    updatedAmount: number;
  }
  return useMutation<ChangeAmountResponse, unknown, T>(changeAmount);
}

export function useHistoryList(options?: {}) {
  const historyList = () => apiService.get('/cart/history');

  interface HistoryListResponse {
    purchasedProducts: PusrchasedProduct[];
  }

  return useQuery<HistoryListResponse>(['cart'], historyList, options);
}

export function useBuy() {
  const buy = () => apiService.post('/cart');

  return useMutation(buy, {
    onSuccess: () => {
      queryClient.setQueryData(['cart'], null);
    },
  });
}
