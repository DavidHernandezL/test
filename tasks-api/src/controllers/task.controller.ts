import { Request, Response } from 'express';
import Task from '../models/Task.js';

const getTasks = async (req: Request, res: Response) => {
    const { limit } = req.query;
    const userId = req.user.id;

    let task = [];

    if (!limit) {
        task = await Task.find({ eliminated: false, user: userId }).sort({ createdAt: -1 });
    } else {
        task = await Task.find({ eliminated: false, user: userId }).sort({ createdAt: -1 }).limit(parseInt(limit as string));
    }
    res.json({
        msg: 'Tareas obtenidas',
        data: task,
    }).status(200);
};

const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const task = new Task({
            title,
            description,
            user: userId,
        });

        const taskSaved = await task.save();

        res.json({
            msg: 'Tarea creada',
            data: taskSaved.toJSON(),
        }).status(201);

    } catch (error) {
        res
            .status(500)
            .json({ msg: 'Fallo del servidor', data: error });
    }
};

const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const taskUpdate = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });

        res.json({
            msg: 'Tarea creada',
            data: taskUpdate?.toJSON(),
        }).status(200);
    } catch (error) {
        res
            .status(500)
            .json({ msg: 'Fallo del servidor', data: error });
    }



};

const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const taskDelete = await Task.findByIdAndUpdate(id, { eliminated: true }, { new: true });

        res.json({
            taskDelete,
        }).status(200);
    } catch (error) {
        res
            .status(500)
            .json({ msg: 'Fallo del servidor', data: error });
    }
};


export { getTasks, createTask, updateTask, deleteTask };