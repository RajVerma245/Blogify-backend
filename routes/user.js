import { Router } from "express";
import { handleCreateUser, handleLoginUser, handleLogoutUser} from "../controllers/user.js";

const router = Router();

router.get("/signin", (req, res) => {
    if(req.user) return res.render("home", {user:req.user});   
    return res.render("signin", {user : req.user});
})

router.get("/signup", (req, res) => {
     if(req.user) return res.render("home", {user:req.user}); 
    return res.render("signup", {user : req.user});
})

router.post("/signup", handleCreateUser);
router.post("/signin", handleLoginUser);
router.get("/logout", handleLogoutUser);

export {router as userRouter};