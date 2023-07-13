class TicketRepository {
  constructor(ticketDao) {
    this.ticketDao = ticketDao;
  }

  async getTickets({ limit = 10, page = 1, category = '', sort = 1 }) {
    try {
      return await this.ticketDao.get({ limit, page, category, sort });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getTicketById(ticketId) {
    try {
      return await this.ticketDao.getById(ticketId);
    } catch (err) {
      throw new Error(err);
    }
  }

  async createTicket(newTicket) {
    try {
      return await this.ticketDao.createTicket(newTicket);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateTicket(ticketId, updatedTicket) {
    try {
      return await this.ticketDao.update(ticketId, updatedTicket);
    } catch (err) {
      throw new Error(err);
    }
  }

  async removeTicket(ticketId) {
    try {
      return await this.ticketDao.remove(ticketId);
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = 
  TicketRepository