import User from "../models/users.model.js";
import AppError from '../helpers/errorHandler.js';
import bcrypt from 'bcrypt';


const registerUser = async ({ name, email, phone, password }) => {
    if (![name, email, phone, password].every((value) => typeof value === 'string' && value.trim())) {
        throw new AppError(400, 'All fields are required');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: hash,
    });
};

export { registerUser };