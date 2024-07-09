// controllers/savedPost.controller.js
import prisma from "../lib/prisma.js";

export const unsavePost = async (req, res) => {
  const { postId } = req.params;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          postId: postId,
          userId: tokenUserId,
        },
      },
    });

    if (!savedPost) {
      return res.status(404).json({ message: "Saved post not found" });
    }

    await prisma.savedPost.delete({
      where: {
        userId_postId: {
          postId: postId,
          userId: tokenUserId,
        },
      },
    });

    res.status(200).json({ message: "Post unsaved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to unsave post" });
  }
};
