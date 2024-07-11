const { Server } = require("socket.io");

let io;

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Adjust as needed for your security policies
    },
  });

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
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { init, getIO };