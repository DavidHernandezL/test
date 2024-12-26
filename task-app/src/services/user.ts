import axios from './axios';

export const registerUserRequest = async (user) => axios.post('/users', user);

export const getUsersRequest = async (limit) =>
  axios.get('/users', { params: { limit } });
