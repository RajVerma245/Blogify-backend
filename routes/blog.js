import { Router } from "express";
import { handleBlogRoute, hanldeCreateBlog, handleBlogView, handleComment} from "../controllers/blog.js";
import { upload } from "../middleware/blogUpload.js";

const router = Router();

router.get("/addBlog", handleBlogRoute);
router.post("/addBlog", upload.single("coverImage"), hanldeCreateBlog);
router.get("/:id", handleBlogView);
router.post("/comment/:id", handleComment);

export {router as blogRouter};