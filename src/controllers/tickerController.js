const { InMemoryTicketRepository } = require("../repositories/ticket.reposotories");
const { errorDictionary, AppError } = require("../middlewares/manejadorErrores");
const {ticketDao} = require("../Dao/factory");
const ticketRepository = new InMemoryTicketRepository(ticketDao);
class TicketController {
  async createTicket(req, res, next) {
    try {
      const ticketData = req.body;
      const newTicket = ticketRepository.createTicket(ticketData);
      res.status(201).json(newTicket);
    } catch (error) {
      next(error);
    }
  }

  async getTicketById(req, res, next) {
    try {
      const ticketId = req.params.id;
      const ticket = ticketRepository.findTicketById(ticketId);

      if (!ticket) {
        throw errorDictionary.TICKET_NOT_FOUND;
      }

      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const tickets = ticketRepository.findAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      next(error);
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticketId = req.params.id;
      const ticketData = req.body;
      const updatedTicket = ticketRepository.updateTicket(ticketId, ticketData);

      if (!updatedTicket) {
        throw errorDictionary.TICKET_NOT_FOUND;
      }

      res.status(200).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticketId = req.params.id;
      const deletedTicket = ticketRepository.deleteTicket(ticketId);

      if (!deletedTicket) {
        throw errorDictionary.TICKET_NOT_FOUND;
      }

      res.status(200).json(deletedTicket);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TicketController;