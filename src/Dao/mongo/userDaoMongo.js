const { UserModel } = require("./models/userModel");

class UserDaoMongo {
    constructor() {
        this.userModel = UserModel;
    }

    async get(limit = 10, page = 1) {
        try {
            return await this.userModel.paginate({}, { limit, page, lean: true });
        } catch (error) {
            return new Error(error);
        }
    }
    async getByEmail(email) {
        try {
            const usuario = await UserModel.findOne({ email });
            return usuario;
        } catch (error) {
            return new Error(error);
        }
    }
    async create(newUser) {
        try {
            return await this.userModel.create(newUser);
        } catch (error) {
            return new Error(error);
        }
    }
    async updateUserCart(userId, cartId) {
        try {
          await UserModel.updateOne({ _id: userId }, { $set: { cart: cartId } });
          console.log('Cart asociado al usuario con éxito');
        } catch (error) {
          console.error('Error al asociar el carrito al usuario:', error);
        }
      }
}

module.exports = UserDaoMongo;