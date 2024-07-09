// routes/savedPost.routes.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { unsavePost } from "../controllers/savedPost.controller.js";

const router = express.Router();

router.delete("/:postId", verifyToken, unsavePost);

export default router;
