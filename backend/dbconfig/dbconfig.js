import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


async function connectDB(){
    try {
        const connection= await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected successfully!");
        return connection; 

    } catch (error) {
        console.log("mongoDb connection failed",error)
        throw error;
    }
}


export default connectDB