import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from '@prisma/client';
import { createServer } from "http";
import { Server } from "socket.io";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;

const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
// Ticket route

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Dialogflow webhook route
app.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  switch (intentName) {
    case 'GetPropertyDetails':
      await handleGetPropertyDetails(req, res);
      break;
    case 'GetPropertyPrice':
      await handleGetPropertyPrice(req, res);
      break;
    default:
      res.json({
        fulfillmentText: `I'm sorry, I couldn't understand that.`,
      });
  }
});
const handleGetPropertyDetails = async (req, res) => {
  try {
    // Extract postId from Dialogflow's parameters
    const postId = req.body.queryResult.parameters.postId;

    // Ensure postId is properly extracted and logged for debugging
    console.log("Received postId:", postId);

    // Check if postId is present and valid
    if (!postId) {
      return res.json({
        fulfillmentText: "No postId provided",
      });
    }

    // Attempt to fetch property details using Prisma
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postDetail: true,
      },
    });

    // If post found, construct response
    if (post) {
      const details = post.postDetail;
      const responseText = `Property Details:
Title: ${post.title}
Price: $${post.price}
Address: ${post.address}, ${post.city}
Bedrooms: ${post.bedroom}
Bathrooms: ${post.bathroom}
Latitude: ${post.latitude}
Longitude: ${post.longitude}
Type: ${post.type}
Property Type: ${post.property}
Description: ${details ? details.desc : 'N/A'}
Utilities: ${details ? details.utilities : 'N/A'}
Pet: ${details ? details.pet : 'N/A'}
Income: ${details ? details.income : 'N/A'}
Size: ${details ? details.size : 'N/A'} sq ft
Nearby Schools: ${details ? details.school : 'N/A'}
Nearby Bus Stops: ${details ? details.bus : 'N/A'}
Nearby Restaurants: ${details ? details.restaurant : 'N/A'}
`;
      res.json({
        fulfillmentText: responseText,
      });
    } else {
      // If no post found with the given postId
      res.json({
        fulfillmentText: `No property found with ID: ${postId}`,
      });
    }
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.json({
      fulfillmentText: `Error fetching property details: ${error.message}`,
    });
  }
};

const handleGetPropertyPrice = async (req, res) => {
  const postId = req.body.queryResult.parameters.postId;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (post) {
      res.json({
        fulfillmentText: `The price of the property is: $${post.price}`,
      });
    } else {
      res.json({
        fulfillmentText: `No property found with ID: ${postId}`,
      });
    }
  } catch (error) {
    res.json({
      fulfillmentText: `Error fetching property price: ${error.message}`,
    });
  }
};

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