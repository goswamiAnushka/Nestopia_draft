import prisma from "../lib/prisma.js";
import cloudinary from "../cloudinaryConfig.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;
  const mediaUrl = req.file ? req.file.path : null; // Ensure the correct property for the Cloudinary URL

  try {
    // Fetch the chat and verify if the user is part of the chat
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true, // Include users to check if the tokenUserId is part of the chat
      },
    });

    if (!chat || !chat.users.some(user => user.userId === tokenUserId)) {
      return res.status(404).json({ message: "Chat not found or user not authorized!" });
    }

    // Create a new message
    const message = await prisma.message.create({
      data: {
        text,
        media: mediaUrl, // Ensure this matches your database schema for storing Cloudinary URLs
        chatId,
        userId: tokenUserId,
      },
    });

    // Update the chat with the latest message and mark it as seen by the user
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          push: tokenUserId,
        },
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
