import express, { Express } from 'express';

import taskRoutes from '../routes/task.routes.js'
import userRoutes from '../routes/user.routes.js'
import authRoutes from '../routes/auth.routes.js'

import createConnection from '../config/database.js';
// const cors = require('cors');
// const cookies = require('cookie-parser');


class Server {

    public app: Express;
    private port: string | number;
    private paths: {
        auth: string;
        users: string;
        tasks: string;
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            tasks: '/api/tasks'
        };
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // this.app.use(
        //     cors({
        //         origin: process.env.FRONTEND_URL,
        //         credentials: true,
        //     }),
        // );

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        // this.app.use(cookies());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.tasks, taskRoutes);
    }

    dbConnection() {
        createConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
