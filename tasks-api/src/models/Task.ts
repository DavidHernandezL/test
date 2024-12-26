import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
        },
        description: {
            type: String,
            optional: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        eliminated: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'El usuario es obligatorio'],
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export default model('Task', TaskSchema);