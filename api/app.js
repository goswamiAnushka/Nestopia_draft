import express from "express";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

const app= express();

app.listen(8800,()=>{
    console.log("server is running!");
});