const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ticketSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  code: { type: String, unique: true, default: () => uuidv4() },
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
