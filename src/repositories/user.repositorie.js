class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getUserById(id) {
      return await this.dao.getUserById(id);
    }
  
    async createUser(user) {
      return await this.dao.createUser(user);
    }
  
    async updateUser(user) {
      return await this.dao.updateUser(user);
    }
  
    async deleteUser(id) {
      return await this.dao.deleteUser(id);
    }
    }
module.exports = {
        UserRepository,
      };
      