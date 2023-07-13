const { Schema, model, Types } = require('mongoose');

const cartCollection = 'carts';

const cartSchema = Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
    },
  }],
});

cartSchema.pre('find', function () {
  this.populate('products.product');
});

const CartModel = model(cartCollection, cartSchema);

module.exports = CartModel;