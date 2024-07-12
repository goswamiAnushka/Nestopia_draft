import express from "express";
import { addMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../lib/multerCloudinaryConfig.js";

const router = express.Router();

router.post("/:chatId", verifyToken, upload.single("media"), addMessage);

export default router;