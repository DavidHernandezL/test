import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
        },
        username: {
            type: String,
            required: [true, 'El username es obligatorio'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        }
    },
    {
        timestamps: true,
    },
);

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default model('User', userSchema);