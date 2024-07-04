// post.route.js
import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("Router works");
});

export default router;
