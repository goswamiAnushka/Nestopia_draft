// message.controller.js
import prisma from "../lib/prisma.js";
import cloudinary from "../cloudinaryConfig.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;
  const mediaUrl = req.file ? req.file.path : null; // Ensure the correct property for the Cloudinary URL

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        userIDs: true,
      },
    });

    if (!chat || !chat.userIDs.includes(tokenUserId)) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    const message = await prisma.message.create({
      data: {
        text,
        media: mediaUrl, // Ensure this matches your database schema for storing Cloudinary URLs
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
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