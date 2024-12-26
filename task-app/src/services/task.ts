import axios from './axios';

interface Task {
    id?: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

export const getTaskRequest = () => axios.get('/tasks', {
    headers: {
        token: localStorage.getItem('token'),
    }
});

export const getTaskByIdRequest = (id: string) => axios.get(`/tasks/${id}`, {
    headers: {
        token: localStorage.getItem('token'),
    }
});

export const createTaskRequest = (task: Task) => axios.post('/tasks', task, {
    headers: {
        token: localStorage.getItem('token'),
    }
});

export const updateTaskRequest = (id: string, task: Task) => axios.put(`/tasks/${id}`, task, {
    headers: {
        token: localStorage.getItem('token'),
    }
});

export const deleteTaskRequest = (id: string) => axios.delete(`/tasks/${id}`, {
    headers: {
        token: localStorage.getItem('token'),
    }
});
