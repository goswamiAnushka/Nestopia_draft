import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

// Get all chats for a user
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          some: {
<<<<<<< Updated upstream
            userId: tokenUserId,
=======
            id: tokenUserId,
>>>>>>> Stashed changes
          },
        },
      },
      include: {
        users: true,
      },
    });

    for (const chat of chats) {
      const receiverId = chat.users.find((user) => user.userId !== tokenUserId).userId;

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// Get a specific chat
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
<<<<<<< Updated upstream
=======
        users: {
          some: {
            id: tokenUserId,
          },
        },
>>>>>>> Stashed changes
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        users: true,
      },
    });

    if (!chat.users.some(user => user.userId === tokenUserId)) {
      return res.status(403).json({ message: "Not authorized to view this chat!" });
    }

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: tokenUserId,
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// Add a new chat
export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        users: {
<<<<<<< Updated upstream
          create: [
            { userId: tokenUserId },
            { userId: req.body.receiverId },
          ],
        },
      },
      include: {
        users: true,
=======
          connect: [{ id: tokenUserId }, { id: req.body.receiverId }],
        },
>>>>>>> Stashed changes
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

// Mark chat as read
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
<<<<<<< Updated upstream
=======
        users: {
          some: {
            id: tokenUserId,
          },
        },
>>>>>>> Stashed changes
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
      include: {
        users: true,
      },
    });

    if (!chat.users.some(user => user.userId === tokenUserId)) {
      return res.status(403).json({ message: "Not authorized to read this chat!" });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
