import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.ObjectId,
        ref:'blog'
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const comment = mongoose.model('comment', commentSchema);

export {comment};