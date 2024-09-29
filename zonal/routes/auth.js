import express from "express"
import { signUp, } from "../controllers/authModule/signup.controller.js"
import upload from "../config/multer.js"
import { adminLogin, login, logout } from "../controllers/authModule/login.controller.js"

const router=express.Router()

router.post("/signup",upload.single("profilePic"),signUp);
router.post("/login",login)
router.get("/logout",logout);
router.post("/admin/login",adminLogin)


export default router