import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createAccessToken } from '../utils/jwt.js';


const createUser = async (req: Request, res: Response) => {
    const { fullName, username, password } = req.body;

    const isEmailRegistered = await User.findOne({ username });

    try {
        if (isEmailRegistered) {
            res.status(400).json({
                status: 'error',
                msg: 'El username ya está registrado',
                data: { username },
            });
        }

        const salt = bcrypt.genSaltSync();
        const passwordEncrypted = bcrypt.hashSync(password, salt);
        const user = new User({
            fullName,
            username,
            password: passwordEncrypted,
        });

        const userSaved = await user.save();

        const token = await createAccessToken({ id: userSaved._id }, '30d');

        res.json({
            status: 'success',
            msg: 'Usuario creado',
            data: userSaved.toJSON(),
            token,
        }).status(201);
    } catch (error) {
        res
            .status(500)
            .json({ status: 'error', msg: 'Fallo del servidor', data: error });
    }
};

export { createUser };