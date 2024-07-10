import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "https://668e27567494d4801c5432bd--joyful-monstera-323e05.netlify.app/"
  },
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUsers.some((user) => user.userId === userId);
  if (!userExists) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User with userId ${receiverId} is not online.`);
      // Optionally emit an error message or handle it as per your application logic
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
