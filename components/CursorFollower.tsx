"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function CursorFollower() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot — tight tracking
  const dotX = useSpring(cursorX, { damping: 35, stiffness: 700, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 35, stiffness: 700, mass: 0.3 });

  // Outer ring — springy trailing
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      "ontouchstart" in globalThis || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    globalThis.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices only
  if (isTouch) return null;

  const isDark = theme === "dark";

  const dotStyle = isDark
    ? {
        background:
          "radial-gradient(circle at 30% 30%, #f0f0f5, #a1a1aa, #71717a)",
        boxShadow:
          "0 0 8px rgba(192,192,192,0.6), 0 0 20px rgba(192,192,192,0.2)",
      }
    : {
        background:
          "radial-gradient(circle at 30% 30%, #3f3f46, #1a1a1a, #09090b)",
        boxShadow: "0 0 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.1)",
      };

  const ringStyle = isDark
    ? {
        border: "1.5px solid rgba(192, 192, 192, 0.3)",
        background: "rgba(192, 192, 192, 0.04)",
        boxShadow:
          "0 0 15px rgba(192,192,192,0.08), inset 0 0 8px rgba(192,192,192,0.05)",
      }
    : {
        border: "1.5px solid rgba(0, 0, 0, 0.15)",
        background: "rgba(0, 0, 0, 0.02)",
        boxShadow: "0 0 15px rgba(0,0,0,0.04), inset 0 0 8px rgba(0,0,0,0.02)",
      };

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            ...dotStyle,
          }}
        />
      </motion.div>

      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            ...ringStyle,
          }}
        />
      </motion.div>
    </>
  );
}
