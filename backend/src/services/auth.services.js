import User from "../models/users.model.js";
import AppError from '../helpers/errorHandler.js';
import bcrypt from 'bcryptjs'


const userRegistration=async(name,email,phone,password)=>{
    if(!name||!email||!phone||!password){
        throw new AppError(400,"All fileds are required")
    }
    name.toString();
    email.toString();
    phone.toString();
    password.toString();
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt)
    try {
        const user=await User.create(name,email,phone,hash);
        if(!user){
            throw new AppError(500, "Unable create user")
        }
        return user;
    } catch (error) {
        throw error;
    }
}