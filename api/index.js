import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
const port = process.env.PORT || 8800;

const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (data) => {
    io.to(data.receiverId).emit("getMessage", data);
  });

  socket.on("joinChat", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
