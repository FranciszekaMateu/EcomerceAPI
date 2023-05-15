const { UserModel } = require("./models/user.model");

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

    async create(newUser) {
        try {
            return await this.userModel.create(newUser);
        } catch (error) {
            return new Error(error);
        }
    }
}

module.exports = UserDaoMongo;