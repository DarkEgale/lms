import userRegistration from '../services/auth.service.js';
import {setCookie} from '../helpers/cookie.js';


const Register=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body;
        const user=userRegistration(name,email,phone,password)
        //akhane function para meter pass korte hobe
        setCookie()
        res.status(201).json({sucess:true,message:"Registration successful"})
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
}