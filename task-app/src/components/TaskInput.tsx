import { SubmitHandler, useForm } from "react-hook-form"
import { createTaskRequest, updateTaskRequest } from '../services/task'
import { useEffect, useState } from 'react'

type Inputs = {
    title: string
    description?: string
}
interface ITask {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface TaskInputProps {
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>,
    updatedTask: ITask | null
}
export const TaskInput = ({ setTasks, updatedTask }: TaskInputProps) => {

    const [areModified, setAreModified] = useState(false);

    useEffect(() => {
        if (updatedTask) {
            setAreModified(true);
            setValue('title', updatedTask.title);
            setValue('description', updatedTask.description);
        } else {
            setAreModified(false);
        }
    }, [updatedTask]);
    const { register, handleSubmit, reset, setValue } = useForm<Inputs>()
    const createTask: SubmitHandler<Inputs> = async (data: Inputs) => {

        if (!areModified) {

            createTaskRequest(data)
                .then(({ data }) => {
                    setTasks((tasks) => [...tasks, data.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
                    reset();
                })
                .catch((error) => {
                    console.error(error);
                });

            return;
        }

        if (!updatedTask) return;
        updateTaskRequest(updatedTask?._id, data)
            .then(({ data }) => {
                setTasks((tasks) => tasks.map((task) => {
                    if (task._id === updatedTask._id) {
                        return {
                            ...data.data,
                        }
                    }
                    return task;
                }));
                reset();
                setAreModified(false);
            })
            .catch((error) => {
                console.error(error);
            });

    }
    return (
        <div className="p-10 sm:w-[30%]">
            <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
                <h1 className="text-2xl font-bold sm:mx-auto">{areModified ? 'Actualiza la tarea' : 'Agregar tarea'}</h1>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(createTask)} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block font-medium text-gray-900 text-sm/6">
                                Título
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    type="title"
                                    required
                                    autoComplete="title"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    {...register("title")}
                                />
                            </div>
                        </div>
                        <fieldset className="contents">
                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-lg font-semibold">Descripcion
                                </label>
                                <textarea id="description" rows={5} maxLength={256}
                                    {...register("description")}
                                    placeholder="Escribe una descripción para tu tarea..."
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                            </div>
                        </fieldset>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {areModified ? 'Actualiza la tarea' : 'Agregar tarea'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}