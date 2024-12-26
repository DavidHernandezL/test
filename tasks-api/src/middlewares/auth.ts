import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): any => {
    const { token } = req.headers;

    if (!token) return res.status(404).json({ msg: 'No encontrado' });

    jwt.verify(token as string, process.env.SECRET || '', (err, decoded) => {
        if (err) return res.status(401).json({ msg: 'No autorizado' });
        req.user = decoded;
        next();
        return;
    });

    return;
};

export default verifyAuthToken;