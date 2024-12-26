const { z } = require('zod');

const createUserSchema = z.object({
    fullName: z
        .string({ required_error: 'El nombre es requerido' })
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    username: z
        .string({ required_error: 'El username es requerido' }),
    password: z
        .string({
            required_error: 'La contraseña es requerida',
        })
        .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});


exports.createUserSchema = createUserSchema;