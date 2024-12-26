import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Inputs = {
    username: string
    password: string
}

export const LoginForm = () => {

    const { signin, errors: loginErrors, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(false);
            navigate('/tasks');
        }
    }, [isAuthenticated]);

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const loginUser: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        await signin(data);
        setLoading(false);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(loginUser)} >

            {
                loginErrors && <span className="w-full px-5 py-3 text-red-800 bg-red-300 rounded-md">Nombre de usuario o contraseña erronea</span>
            }
            <div>
                <label htmlFor="username" className="block font-medium text-gray-900 text-sm/6">Usuario</label>
                <div className="mt-2">
                    <input type="username" id="username" autoComplete="username" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register("username")} />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block font-medium text-gray-900 text-sm/6">Contraseña</label>
                </div>
                <div className="mt-2">
                    <input type="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" {...register("password")} />
                </div>
            </div>

            <div>
                <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}</button>
            </div>
        </form>
    )
}