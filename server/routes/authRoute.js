import express from "express";
import { register, login, logout, isLoggedIn } from "../controllers/userAuth.js";
const router = express.Router();


router.post("/register", register);
//http://localhost:8000/api/auth/register
router.post("/login", login)
//http://localhost:8000/api/auth/login
router.get("/logout", logout)
//http://localhost:8000/api/auth/logout
router.get("/is_logged_in", isLoggedIn)
//http://localhost:8000/api/auth/is_logged_in
/* This is_logged_in utility use then to cheack user is logged in or not if it is logged in it say true o.w say false if not */

export default router;
