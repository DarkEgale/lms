import jwt from "jsonwebtoken";
import { token } from "morgan";

const accessToken=(id)=>{
     try{
        if(!id){
            throw new Error("Id is not found !")
        }
        const token=jwt.sign({id:id},process.env.API_SECRECT,{expireIn:"15m"})
        return token;
     }catch(error){
        throw error;
     }
}

const refreshToken=(id)=>{
     try{
        if(!id){
            throw new Error("Id is not found !")
        }
        const token=jwt.sign({id:id},process.env.REFRESH_API_SECRECT,{expireIn:"30d"})
        return token;
     }catch(error){
        throw error;
     }
}


export {accessToken,refreshToken}