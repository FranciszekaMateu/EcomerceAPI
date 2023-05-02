const { v4: uuidv4 } = require('uuid');

class TicketDao {
  constructor() {
    this.tickets = [];
  }

  createTicket(ticketData) {
    const newTicket = {
      ...ticketData,
      _id: uuidv4(),
      code: uuidv4(),
      purchase_datetime: new Date(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

  findTicketById(ticketId) {
    return this.tickets.find((ticket) => ticket._id === ticketId) || null;
  }

  findAllTickets() {
    return this.tickets;
  }

  updateTicket(ticketId, ticketData) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket._id === ticketId);

    if (ticketIndex === -1) {
      return null;
    }

    const updatedTicket = {
      ...this.tickets[ticketIndex],
      ...ticketData,
    };

    this.tickets[ticketIndex] = updatedTicket;
    return updatedTicket;
  }

  deleteTicket(ticketId) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket._id === ticketId);

    if (ticketIndex === -1) {
      return null;
    }

    const deletedTicket = this.tickets[ticketIndex];
    this.tickets.splice(ticketIndex, 1);
    return deletedTicket;
  }
}

module.exports = TicketDao;
