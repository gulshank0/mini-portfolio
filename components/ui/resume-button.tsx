"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

export function AnimatedResumeButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      className="w-full bg-purple-500 hover:bg-purple-600 text-white relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      asChild
    >
      <a
        href="https://drive.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        <motion.div
          className="absolute inset-0 bg-purple-400"
          initial={false}
          animate={{
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            y: isHovered ? -30 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Download className="mr-2 h-4 w-4" />
          View Resume
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 30,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          Google Drive Link
        </motion.div>
      </a>
    </Button>
  );
}