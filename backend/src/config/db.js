import mongoose from "mongoose";


const bd_url=process.env.DATABASE;

const connectDB=async()=>{
    try{
        await mongoose.connect(db_url)
        console.log("Server is connected with database")
    }catch(error){
        console.error(error)
    }
}

export default connectDB;