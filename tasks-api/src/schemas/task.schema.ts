const { z } = require('zod');

const createUserSchema = z.object({
    title: z
        .string({ required_error: 'El título es requerido' }),
    description: z
        .optional()
        .string(),
    completed: z
        .boolean()
        .default(false),
    eliminated: z
        .boolean()
        .default(false),
    user: z
        .string()
});

exports.createUserSchema = createUserSchema;