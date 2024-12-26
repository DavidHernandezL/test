import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
    const { token } = req.headers;

    if (!token) res.status(404).json({ msg: 'No encontrado' });

    jwt.verify(token as string, process.env.SECRET || '', (err, decoded) => {
        req.user = decoded;
        if (err) res.status(401).json({ msg: 'No autorizado' });
        next();
    });
};

export default verifyAuthToken;