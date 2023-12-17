import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import logger from 'logger';
import { DATABASE_DOCUMENTS } from 'app.constants';

import { Product } from './product.types';
import { productService } from './index';
import { ProductType } from './product.types';

const { PRODUCTS } = DATABASE_DOCUMENTS;

eventBus.onUpdated(
  PRODUCTS,
  ['quantity'],
  async (data: InMemoryEvent<Product>) => {
    try {
      const product = data.doc;

      if (product.quantity === 0) {
        await productService.atomic.updateOne(
          { _id: product._id },
          { $set: { lastRequest: new Date(), status: ProductType.SOLD } },
        );
      }
    } catch (err) {
      logger.error(`${PRODUCTS} onUpdated ['quantity'] handler error: ${err}`);
    }
  },
);
