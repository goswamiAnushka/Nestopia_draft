import express from "express";
import { login, logout, register, sendOtp, verifyOtpAndResetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", sendOtp);
router.post("/reset-password", verifyOtpAndResetPassword);

export default router;
