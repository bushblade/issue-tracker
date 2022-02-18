import axios from 'axios';

const api_url = 'api/users';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const register = async (user) => {
  const response = await axios.post(api_url, user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// @desc    Login an existing user
// @route   POST /api/users/login
// @access  Public
const login = async (user) => {
  const response = await axios.post(api_url + '/login', user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// @desc    Logout an existing user
// @route   none
// @access  Public
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };

export default authService;
