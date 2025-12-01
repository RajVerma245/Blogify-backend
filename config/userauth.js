import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function setUser(user) {
    return jwt.sign(user, process.env.SECRET, {expiresIn:"1h"});
}

function getUser(token) {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (err) {
        console.log("Error from getUser :", err);
        return null;
    }
}

export {getUser, setUser};