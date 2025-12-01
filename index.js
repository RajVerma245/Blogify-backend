import express from "express";
import ejs from "ejs";
import path from "path"
import { dbConnect } from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { blog } from "./models/blog.js";

import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";

import { checkAuthentication } from "./middleware/authentication.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

dbConnect(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(checkAuthentication("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve('public')))

app.get("/", async (req, res) => {  
   const allblogs = await blog.find();
   console.log(allblogs);
   res.render("home",{
    user:req.user,
    blogs:allblogs
   });   
})

app.use('/users', userRouter);
app.use("/blog", blogRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log("server running"));