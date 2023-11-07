enum ProductType {
  SOLD = 'sold',
  ONSALE = 'onsale',
}

export interface Product {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  title: string;
  price: number;
  status: ProductType;
  quantity: number;
  userId: string;
  photoUrl?: string;
}
