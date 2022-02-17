import axios from 'axios';

const api_url = 'api/users';

// register user
const register = async (user) => {
  const response = await axios.post(api_url, user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (user) => {
  const response = await axios.post(api_url + '/login', user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// logut user
const logout = () => localStorage.removeItem('user');

const authService = { register, login, logout };

export default authService;
