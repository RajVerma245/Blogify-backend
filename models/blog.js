import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,        
    },
    body:{
       type:String,
       required:true 
    },
    Author:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }
}, {timestamps:true});

const blog = mongoose.model("blog", blogSchema);

export { blog };