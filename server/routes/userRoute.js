import express from "express";
const router = express.Router();
import { getUserInfo, updateUser } from "../controllers/user.js";

router.get("/me", getUserInfo);
//http://localhost:8000/api/users/me
router.put("/me/u", updateUser)
//http://localhost:8000/api/users/me/u



export default router;