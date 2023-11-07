import { Product } from 'resources/product/product.types';

export interface User {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  passwordHash: string;
  isEmailVerified: boolean;
  isShadow: boolean | null;
  signupToken: string | null;
  resetPasswordToken?: string | null;
  avatarUrl?: string | null;
  oauth?: {
    google: boolean;
  };
  purchasedProducts?: PusrchasedProduct[];
  productsInCar?: Product[];
}

export interface PusrchasedProduct {
  id: string;
  title: string;
  price: number;
  purchaseDate: Date;
}

export interface InCartProduct {
  id: string;
  title: string;
  price: number;
  quantityInCart: number;
}
