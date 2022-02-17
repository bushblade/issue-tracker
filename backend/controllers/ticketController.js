const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Create new tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  // get required fields from data
  // entered by user
  const { project, link, description } = req.body;

  // check if the required fields (proj & desc)
  // are given by user, error otherwise
  if (!project || !description) {
    res.status(400);
    throw new Error('Please add a project and description of the ticket.');
  }

  // JWT used to get user profile
  const user = await User.findById(req.user.id);

  // throw error if no user exists.
  if (!user) {
    res.status(401);
    throw new Error('No user found.');
  }

  // creating and pushing the
  // ticket into the database
  const ticket = await Ticket.create({
    project,
    description,
    link,
    user: req.user.id,
    status: 'NEW',
  });
  res.status(201).json(ticket);
});

// @desc    Get all of the user's tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // JWT used to get user profile
  const user = await User.findById(req.user.id);

  // throw error if no user exists.
  if (!user) {
    res.status(401);
    throw new Error('No user found.');
  }

  // get tickets specific to user, using JWT,
  // from Ticket model
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc    Get a single ticket from the user's account
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // JWT used to get user profile
  const user = await User.findById(req.user.id);

  // error if no user found
  if (!user) {
    res.status(401);
    throw new Error('No user found.');
  }

  // get tickets specific to user, using JWT,
  // from Ticket model
  const ticket = await Ticket.findById(req.params.id);

  // error if no ticket found
  if (!ticket) {
    res.status(404);
    throw new Error('No Tickets found.');
  }

  // authenticate if the user making
  // request is user owning the ticket,
  // throw error otherwise
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  //sending ticket here
  res.status(200).json(ticket);
});

// @desc    Get a single ticket from the user's account
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // JWT used to get user profile
  const user = await User.findById(req.user.id);

  // throw error if no user exists.
  if (!user) {
    res.status(401);
    throw new Error('No user found.');
  }

  // get tickets specific to user, using JWT,
  // from Ticket model
  const ticket = await Ticket.findById(req.params.id);

  // throw error if no ticket exists.
  if (!ticket) {
    res.status(404);
    throw new Error('No Tickets found.');
  }

  // authenticate if the user making
  // request is user owning the ticket,
  // throw error otherwise
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // removing ticket here
  await ticket.remove();
  res.status(200).json({ success: true });
});

// @desc    UPDATE a ticket from the user's account
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // JWT used to get user profile
  const user = await User.findById(req.user.id);

  // throw error if no user exists.
  if (!user) {
    res.status(401);
    throw new Error('No user found.');
  }

  // get tickets specific to user, using JWT,
  // from Ticket model
  const ticket = await Ticket.findById(req.params.id);

  // throw error if no ticket exists.
  if (!ticket) {
    res.status(404);
    throw new Error('No Tickets found.');
  }

  // authenticate if the user making
  // request is user owning the ticket,
  // throw error otherwise
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // updating ticket here
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
