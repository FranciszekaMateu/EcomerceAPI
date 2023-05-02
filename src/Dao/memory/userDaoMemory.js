const { v4: uuidv4 } = require('uuid');

class UserDaoMemory {
  constructor() {
    this.users = [];
  }

  get(limit = 10, page = 1) {
    try {
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedUsers = this.users.slice(start, end);
      return {
        docs: paginatedUsers,
        total: this.users.length,
      };
    } catch (error) {
      return new Error(error);
    }
  }

  create(newUser) {
    try {
      const createdUser = {
        ...newUser,
        _id: uuidv4(),
      };
      this.users.push(createdUser);
      return createdUser;
    } catch (error) {
      return new Error(error);
    }
  }
}

module.exports = UserDaoMemory;