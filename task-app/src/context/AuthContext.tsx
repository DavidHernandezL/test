import { createContext, useState, useContext } from 'react';
import {
	loginUserRequest,
	verifyUserTokenRequest,
} from '../services/auth';

import { useEffect } from 'react';

export const AuthContext = createContext<any>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

import { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [errors, setErrors] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrors(null);
		}, 3000);
		return () => clearTimeout(timer);
	}, [errors]);

	useEffect(() => {
		const checkLogin = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			try {
				const { data: res } = await verifyUserTokenRequest();
				if (!res.data) return setIsAuthenticated(false);
				setIsAuthenticated(true);
				setUser(res.data);
				setLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setLoading(false);
			}
		};
		checkLogin();
	}, []);

	const signin = async (user: any) => {
		try {
			const { data: response } = await loginUserRequest(user);
			const { data: userResponse, token } = response;
			localStorage.setItem('token', token);
			setUser(userResponse);
			setIsAuthenticated(true);
			setErrors(null);
		} catch (error: any) {
			if (error.code === 'ERR_NETWORK') {
				console.log('Fallo en la conexión de internet');
				setErrors({ msg: 'Fallo en la conexión de internet' });
			}
			setErrors({ msg: error.response.data.msg });
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				signin,
				user,
				isAuthenticated,
				errors,
				loading,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
