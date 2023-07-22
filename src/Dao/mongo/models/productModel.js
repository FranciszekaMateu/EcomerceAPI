const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const collection = 'products';

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    atCreate: {
        type: Date,
        default: new Date()
    }
},{ timestamps: true });

ProductSchema.methods.toJSON = function() {
    const { __v, isActive, ...data } = this.toObject();
    return data;
};

ProductSchema.plugin(mongoosePaginate);

const productModel = model(collection, ProductSchema);

module.exports = {
    productModel
};
