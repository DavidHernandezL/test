import { deleteTaskRequest, updateTaskRequest } from '../services/task';

interface ITask {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface TaskProps {
    task: ITask;
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
    setTaskSelected: React.Dispatch<React.SetStateAction<ITask | null>>
}

interface Task {
    id?: string;
    title?: string;
    description?: string;
    completed?: boolean;
}


const Task = ({ task, setTasks, setTaskSelected }: TaskProps) => {

    const { _id, title, description = 'Sin descripción', completed, createdAt, updatedAt } = task
    const status = completed ? 'Completada' : 'Pendiente';
    const color = completed ? 'text-green-600' : 'text-yellow-600';


    const deleteTask = async () => {
        try {
            await deleteTaskRequest(_id);
            setTasks((tasks) => tasks.filter((task) => task._id !== _id));
        } catch (error) {
            console.error(error);
        }
    }

    const toggleCompleteTask = async () => {
        try {
            const task: Task = {
                completed: !completed,
            }
            await updateTaskRequest(_id, task);
            setTasks((tasks) => tasks.map((task) => {
                if (task._id === _id) {
                    return {
                        ...task,
                        completed: !completed,
                    }
                }
                return task;
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const updateTask = async () => {
        setTaskSelected(task);
    }

    const date = completed ? new Date(updatedAt) : new Date(createdAt);
    return (
        <li className='border-b border-gray-200 '>
            <div className="px-5 py-4 mb-5 ">
                <div className="flex items-center justify-between ">
                    <h3 className="overflow-hidden text-lg font-medium leading-6 text-gray-900 ">{title}</h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">{Intl.DateTimeFormat('es-MX', {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                    }).format(date)}</p>
                </div>
                <div className='mt-2'>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-medium text-gray-500">Estado: <span className={color}>{status}</span></p>
                    <div className='flex space-x-2'>
                        {
                            completed ?
                                <button className="font-medium text-yellow-600 hover:text-yellow-500" onClick={() => toggleCompleteTask()} >Sin Terminar</button>
                                :
                                <button className="font-medium text-green-600 hover:text-green-500" onClick={() => toggleCompleteTask()} >Completar</button>
                        }
                        <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => updateTask()}>Editar</button>
                        <button className="font-medium text-red-600 hover:text-red-500" onClick={() => deleteTask()}>Eliminar</button>
                    </div>
                </div>

            </div>
        </li>
    )
}

export default Task;
