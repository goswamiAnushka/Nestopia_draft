import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma  from './lib/prisma.js';
import { createServer } from "http";
import { Server } from "socket.io";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import { PrismaClient } from "@prisma/client";





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

app.post('/api/webhook', async (req, res) => {
  console.log('Request body:', JSON.stringify(req.body, null, 2)); // Log entire request for debugging
  
  const intentName = req.body.queryResult.intent.displayName;
  let propertyId = req.body.queryResult.parameters.propertyId; // Extract propertyId from parameters

  console.log('Received intent:', intentName);
  console.log('Received propertyId:', propertyId);

  // Extract the actual postId from the propertyId if needed
  if (propertyId.startsWith('Tell me about property ')) {
    propertyId = propertyId.replace('Tell me about property ', ''); // Extract postId from the string
  }

  console.log('Processed propertyId:', propertyId); // Log the processed propertyId

  if (intentName === 'GetPropertyDetails') {
    try {
      const post = await prisma.post.findUnique({
        where: { postId: propertyId },
        include: { postDetail: true, user: true },
      });

      console.log('Post fetched:', post);

      if (post) {
        const { title, price, address, city, bedroom, bathroom, property, postDetail } = post;
        const { desc, utilities, pet, income, size, school, bus, restaurant } = postDetail || {};

        res.json({
          fulfillmentText: `Property details:
          Title: ${title}
          Price: ${price}
          Address: ${address}, ${city}
          Bedrooms: ${bedroom}
          Bathrooms: ${bathroom}
          Type: ${property}
          Description: ${desc}
          Utilities: ${utilities}
          Pet Friendly: ${pet}
          Income Requirement: ${income}
          Size: ${size} sqft
          Nearby Schools: ${school}
          Nearby Bus Stops: ${bus}
          Nearby Restaurants: ${restaurant}`
        });
      } else {
        res.json({
          fulfillmentText: `No property found with ID: ${propertyId}`
        });
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
      res.json({
        fulfillmentText: 'Error fetching property details'
      });
    }
  } else {
    res.json({
      fulfillmentText: `Unhandled intent: ${intentName}`
    });
  }
});


// Socket.IO setup for real-time messaging
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

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});