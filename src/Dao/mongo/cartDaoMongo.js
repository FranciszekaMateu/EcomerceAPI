class CartDaoMongo {
    constructor(Cart) {
        this.Cart = Cart;
    }

    async getCarts() {
        try {
            return await this.Cart.find();
        } catch (error) {
            return new Error(error);
        }
    }

    async getCart(id) {
        try {
            return await this.Cart.find({ _id: id });
        } catch (error) {
            return new Error(error);
        }
    }

    async createCart() {
        try {
            return await this.Cart.create({ products: [] });
        } catch (err) {
            return new Error('Error creating cart' + err);
        }
    }

    async addProductInCart(cid, product) {
        try {
            const updatedCart = await this.Cart.findOneAndUpdate(
                { _id: cid, 'products.product': product.id },
                { $inc: { 'products.$.quantity': product.quantity } },
                { new: true }
            );

            if (updatedCart) {
                return updatedCart;
            }

            const newProductInCart = await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $push: { products: { product: product.id, quantity: product.quantity } } },
                { new: true, upsert: true }
            );

            return newProductInCart;
        } catch (error) {
            return new Error('Error adding product to cart' + error);
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            return await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $pull: { products: { product: pid } } },
                { new: true }
            );
        } catch (error) {
            return new Error('Error deleting product from cart' + error);
        }
    }

    async deleteCart(cid) {
        try {
            return await this.Cart.findOneAndUpdate(
                { _id: cid },
                { $set: { products: [] } },
                { new: true }
            );
        } catch (error) {
            return new Error('Error deleting cart' + error);
        }
    }
}

module.exports = {
    CartDaoMongo
};