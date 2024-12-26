import axios from './axios';

export const registerUserRequest = async (user: any) => axios.post('/users', user);

export const getUsersRequest = async (limit: any) =>
  axios.get('/users', { params: { limit } });
