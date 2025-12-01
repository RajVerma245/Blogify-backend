import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true,    
    },
    profileImageUrl:{
        type:String,
        default:"/images/default.png"
    },
    role : {
        type:String,
        enum:["User", "Admin"],
        default:"User"
    }

})

userSchema.pre("save", async function(){    
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

const user = mongoose.model("user",userSchema);

export {user};