import express from "express";
import {login, register, deleteProfile} from "./AuthController.js";
import authMiddleware from "../AuthMiddleware.js";

const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.delete("/deleteProfile", authMiddleware, deleteProfile)
export default authRouter;