import mongoose from "mongoose";

async function dbConnect(url){
    await mongoose.connect(url);
    console.log("DB is connected");
}

export {dbConnect};