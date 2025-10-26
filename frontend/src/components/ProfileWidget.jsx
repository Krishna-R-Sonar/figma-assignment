// frontend/src/components/ProfileWidget.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileWidget = () => {
  const [activeTab, setActiveTab] = useState("recommended");

  const tabs = ["about me", "experiences", "recommended"];
  const tabContent = {
    "about me": `Hello! I’m Dave, your sales rep here from Salesforce. 
    I’ve been working at this awesome company for 3 years now.`,
    experiences: `I’ve worked across multiple sales teams handling enterprise clients 
    and helping businesses grow with Salesforce solutions.`,
    recommended: `I was born and raised in Albany, NY & have been living in Santa Carla 
    for the past 10 years with my wife Tiffany and twin daughters — Emma and Ella. 
    My calendar is usually blocked between 9–10 AM as I drop them off to school.`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="bg-[#2c2f33] text-gray-200 rounded-2xl shadow-2xl p-6 w-full max-w-xl backdrop-blur-md border border-gray-700/30"
    >
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded-lg capitalize font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-gray-800 text-white shadow-md scale-105"
                : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Animated Text */}
      <div className="text-sm leading-relaxed overflow-y-auto max-h-48">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {tabContent[activeTab]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileWidget;
