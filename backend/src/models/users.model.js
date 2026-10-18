import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name filed are required !"]
    },
    email:{
        type:String,
        required:[true,"Email filed are required !"]
    },
    phone:{
        type:String,
        required:[true,"Phone filed are required !"]
    },
    password:{
        type:String,
        required:[true,"Password filed are required !"]
    },
    avatar:{
        type:String,
    },
    address:{
        type:String
    }
},{timestamps:true})
userSchema.index({name:'text'})


const Users=mongoose.model('Users',userSchema)

export default Users;