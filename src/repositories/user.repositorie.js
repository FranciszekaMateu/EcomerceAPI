class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async getUsers(id) {
    return await this.dao.getUsers(id);
  }
  async getUserByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async create(user) {
      console.log(this.dao)
      return await this.dao.create(user);
  }

  async updateUser(user) {
    return await this.dao.updateUser(user);
  }

  async deleteUser(id) {
    return await this.dao.deleteUser(id);
  }
  async  updateUserCart(userId, cartId) {
    await this.dao.updateUserCart(userId, cartId);
  }
}

module.exports = {
  UserRepository,
};