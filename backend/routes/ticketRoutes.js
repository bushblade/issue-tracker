const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');
const { update } = require('../models/userModel.js');

// a route for all things on homepage routes on main page
router.route('/').get(protect, getTickets).post(protect, createTicket);

// a route for sigle ticket using its id
router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
