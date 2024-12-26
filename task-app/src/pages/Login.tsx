import { LoginForm } from '../components/LoginForm'

export const Login = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Task" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Iniciar sesión con tu cuenta</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
