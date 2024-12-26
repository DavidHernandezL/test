import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import Task from '../models/Task.js'

const seedUsers = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager');

    await Task.deleteMany();
    await User.deleteMany();

    const users = [
        {
            fullName: 'David Hernandez',
            username: 'dhernandez',
            password: 'dhernandez123',
        },
        {
            fullName: 'Luis Peres',
            username: 'lperez',
            password: 'lperez123',
        },
    ];

    for (const user of users) {
        const salt = bcrypt.genSaltSync();
        const passwordEncrypted = bcrypt.hashSync(user.password, salt);
        user.password = passwordEncrypted
        const newUser = new User(user);
        await newUser.save();
    }

    console.log('Users seeded successfully');
    mongoose.connection.close();
};

seedUsers().catch((error) => {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
});