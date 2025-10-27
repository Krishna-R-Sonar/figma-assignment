// frontend/src/components/GalleryWidget.jsx
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const GalleryWidget = () => {
  const [images, setImages] = useState([]);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Upload local image → backend → Cloudinary
  const handleAddImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "https://figma-assignment-3hwt.onrender.comapi/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImages((prev) => [...prev, res.data.url]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#2c2f33] text-gray-200 rounded-2xl shadow-2xl p-6 w-full max-w-xl backdrop-blur-md border border-gray-700/30"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-gray-800 px-5 py-2 rounded-lg font-medium text-white shadow-inner">
          Gallery
        </button>
        <div className="flex items-center space-x-3">
          <label
            htmlFor="fileInput"
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer transition-all"
          >
            <Plus size={18} /> <span>Add Image</span>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("left")}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
          >
            <ArrowLeft size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("right")}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Gallery */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth pb-2 scrollbar-hide px-4" // px-4 adds space on left/right
        style={{ gap: "1.5rem" }} // dynamic gap between images
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 rounded-2xl w-48 h-48 cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.1,
              rotate: -3,
              zIndex: 10,
              boxShadow: "0 0 20px 4px rgba(0,140,255,0.5)",
              backgroundColor: "rgba(0,140,255,0.1)",
            }}
            whileTap={{ scale: 1.05, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              duration: 0.3,
            }}
          >
            <img
              src={src}
              alt={`gallery-${i}`}
              className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GalleryWidget;
