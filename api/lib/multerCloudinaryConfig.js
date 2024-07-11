import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "chat_nestopia", // Optional: specify a folder
    format: async (req, file) => "jpg", // Supports promises as well
    public_id: (req, file) => file.originalname.split('.')[0], // Use the file's original name (without extension)
  },
});

const upload = multer({ storage });

export default upload;
