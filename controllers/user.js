import { user } from "../models/users.js";
import { setUser } from "../config/userauth.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

async function handleCreateUser(req, res){
    try {
        const {fullName, password, email} = req.body;

        if(!fullName || !password || !email) return res.status(400).json({
            message:"All fields are required",
            status:false
        })

        console.log("UserData is : ",fullName, password, email);
        
        const exists = await user.findOne({email});
        if(exists){
            return res.status(409).json({
                message: "Email already registered",
                status: false
            });
        }

        const newUser = await user.create({
            fullName,
            password,
            email
        })

        // res.status(201).json({
        //     message:"User is created successfully",
        //     status:true,
        //     userId:newUser._id
        // })

        res.redirect("/");

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            message: "Server error",
            status: false
        });        
    }
}


async function handleLoginUser(req, res){
    try {
        const {password, email} = req.body;

        if(!password || !email) return res.status(400).json({
            message:"All field is required",
            status:false
        })
        
        const curruser = await user.findOne({email});

        if(!curruser){
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }
        
        const isUserPasswordSame = await bcrypt.compare(password, curruser.password);
        
        if(!isUserPasswordSame) return res.status(400).json({
            message:"Invalid Password",
            status:false
        })

        const token = setUser({
           id:curruser._id,
           email:curruser.email,
           role:curruser.role
        });

        console.log("user token :", token);
        
        res.cookie("token", token, {
            httpOnly:true,
            sameSite:"strict",
            maxAge: 1000*60*60,
            secure:process.env.NODE_ENV === "production",
        });

        console.log("Logged and Dev or Production : ",process.env.NODE_ENV);

        res.redirect("/")
        // res.status(200).json({
        //     message:"Logged in successfully",
        //     status:true,
        //     userId:curruser._id
        // })

    } catch (err) {

        console.log(err);
        return res.status(500).json({
            message: "Server error",
            status: false
        });        
    }
}

async function handleLogoutUser(req, res){
    res.clearCookie("token")
    res.redirect("/")
    console.log("cleared cookie");
}


export {handleCreateUser, handleLoginUser, handleLogoutUser}