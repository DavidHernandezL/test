import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js';
import verifyAuthToken from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyAuthToken, getTasks);

router.post('/', verifyAuthToken, createTask);

router.put('/:id', verifyAuthToken, updateTask);

router.delete('/:id', verifyAuthToken, deleteTask);



export default router;