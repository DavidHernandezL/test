import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Task from '../components/Task';
import { getTaskRequest } from '../services/task';
import { TaskInput } from '../components/TaskInput';

interface ITask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const TaskPage = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      const { data: response } = await getTaskRequest();
      setTasks(response.data);
    };
    getTasks();
  }, []);

  return (
    <>
      <Header />
      <div className='w-full min-h-screen bg-gray-100 sm:flex sm:items-center sm:justify-center'>
        <TaskInput setTasks={setTasks} updatedTask={taskSelected} />
        <ul className=" bg-white shadow sm:rounded-md  sm:w-[40%] sm:mr-10">
          {
            tasks.map(task => (
              <Task key={task._id} task={task} setTasks={setTasks} setTaskSelected={setTaskSelected} />
            ))
          }

        </ul>
      </div>
    </>
  );
};

export default TaskPage;
