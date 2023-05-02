const Ticket = require('.model/ticketModel.js');

class TicketDao {
  async createTicket(ticketData) {
    try {
      const newTicket = new Ticket(ticketData);
      return await newTicket.save();
    } catch (error) {
      throw error;
    }
  }

  async findTicketById(ticketId) {
    try {
      return await Ticket.findById(ticketId);
    } catch (error) {
      throw error;
    }
  }

  async findAllTickets() {
    try {
      return await Ticket.find({});
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(ticketId, ticketData) {
    try {
      return await Ticket.findByIdAndUpdate(ticketId, ticketData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(ticketId) {
    try {
      return await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketDao;
