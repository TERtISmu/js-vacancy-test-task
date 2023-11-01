import { eventBus, InMemoryEvent } from '@paralect/node-mongo';

import logger from 'logger';
import ioEmitter from 'io-emitter';
import { DATABASE_DOCUMENTS } from 'app.constants';

import { Product } from './product.types';
import { productService } from './index';
import { ProductType } from './product.types';

const { PRODUCTS } = DATABASE_DOCUMENTS;

eventBus.on(`${PRODUCTS}.updated`, (data: InMemoryEvent<Product>) => {
  try {
    const product = data.doc;

    ioEmitter.publishToUser(product._id, 'user:updated', product);
  } catch (err) {
    logger.error(`${PRODUCTS}.updated handler error: ${err}`);
  }
});

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
