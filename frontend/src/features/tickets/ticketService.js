import axios from 'axios';

const api_url = '/api/tickets/';

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (ticketData, token) => {
  // making the authorization variable to
  // access user specific tickets by
  // passing in JWT
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(api_url, ticketData, config);

  return response.data;
};

// @desc    Get all tickets of the user
// @route   GET /api/tickets
// @access  Private
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(api_url, config);

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
};

export default ticketService;
