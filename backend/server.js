// backend/server.js
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config (same as TalentTrack)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary folder used in TalentTrack convention
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "TalentTrack_Figma_Assignment_Gallery" }, // ✅ Folder name
      (error, result) => {
        if (error)
          return res.status(500).json({ error: error.message });
        res.json({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete uploaded image from Cloudinary
app.delete("/api/delete/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
