import express from "express";
const router = express.Router();
import taskRoute from "./task.js"
import authRoute from "./authRoute.js"
import userRoute from "./userRoute.js"
import cheackAuth from "../utils/cheackAuth.js";

router.use("/auth", authRoute);

router.use("/task", cheackAuth, taskRoute);

router.use("/users",cheackAuth, userRoute);


export default router;