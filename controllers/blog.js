import {blog} from "../models/blog.js"
import { comment } from "../models/comment.js";

async function handleBlogRoute(req, res) {
    const curruser = req.user;
    if(!curruser) return res.render("signin",{user:null})
    // console.log(curruser);
    res.render("blog", {user:curruser});
}

async function hanldeCreateBlog(req, res) {
    const { title, body } = req.body;
    const coverImage = `/uploads/${req.file.filename}`;  
  
    console.log("File:", coverImage);
    console.log("UserID:", req.user.id);
    
    const userblog = await blog.create({
        title:title,
        body, body,
        coverImage:coverImage,
        Author:req.user.id
    })
    
    // console.log(userblog);
    const allblogs = await blog.find();
    res.redirect('/')
}

async function handleBlogView(req, res) {
    const userBlog = await blog.findById(req.params.id).populate("Author");
    console.log(userBlog);
    const comments = await comment.find({blogId:req.params.id}).populate("createdBy")
    console.log(comments)
    res.render("showBlog", {
        user:req.user,
        blog:userBlog,
        comments:comments
    })
}

async function handleComment(req, res) {
    const {content} = req.body;
    await comment.create({
        content,
        blogId:req.params.id,
        createdBy:req.user.id
    })
    const currblogId = req.params.id;
    // const 
    res.redirect(`/blog/${currblogId}`);
}

export {handleBlogRoute, hanldeCreateBlog, handleBlogView, handleComment};