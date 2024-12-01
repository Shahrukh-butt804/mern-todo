import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content : {
        type : String,
        lowercase : true,
        required : true
    },
    isCompleted:{
        type : Boolean,
        default : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},{timestamps: true})

export const Todo = mongoose.model("Todo",todoSchema)