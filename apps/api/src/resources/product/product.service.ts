import _ from 'lodash';

import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './product.schema';
import { Product } from './product.types';

const service = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

const updateLastRequest = (_id: string) => {
  return service.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

// const decrementNumber = (ids: string[]) => {
//   return service.atomic.updateOne(
//     { _id: { $in: ids } },
//     {
//       $inc: { quantity: -1 },
//       $set: {
//         lastRequest: new Date(),
//       },
//     }
//   );

const decrementNumber = (id: string) => {
  return service.atomic.updateOne(
    { _id: id },
    {
      $inc: { quantity: -1 },
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

export default Object.assign(service, {
  updateLastRequest,
  decrementNumber,
});
