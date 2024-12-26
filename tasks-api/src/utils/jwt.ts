import jwt from 'jsonwebtoken';

const createAccessToken = (payload: { id: any }, expiresIn: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET as string, { expiresIn }, (err, token) => {
            if (err) {
                reject(new Error('No se pudo generar el token'));
            } else {
                resolve(token);
            }
        });
    });
};

const verifyAccessToken = (token: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET as string, (err, decoded) => {
            if (err) {
                reject(new Error('No se pudo generar el token'));
            } else {
                resolve(decoded);
            }
        });
    });
};

export { createAccessToken, verifyAccessToken };