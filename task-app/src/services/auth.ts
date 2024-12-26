import axios from './axios.js';

interface User {
	username: string;
	password: string;
}

export const loginUserRequest = async (user: User) => axios.post('/auth/login', user);

export const verifyUserTokenRequest = async () => axios.get('/auth/verify', {
	headers: {
		token: localStorage.getItem('token'),
	}
});

