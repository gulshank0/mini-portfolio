"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const socialLinks = [
  { label: "github", href: "https://github.com/gulshank0" },
  { label: "twitter", href: "https://x.com/gulshank0" },
  { label: "linkedin", href: "https://www.linkedin.com/in/gulshank0/" },
];

interface ProfileToastProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function ProfileToast({ isOpen, onClose }: ProfileToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (toastRef.current && !toastRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay listener to avoid the triggering click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            ref={toastRef}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div
              className={`flex items-center gap-7 px-8 py-7 rounded-2xl shadow-2xl ${
                theme === "dark"
                  ? "bg-[#1a1a1e] border border-[rgba(161,161,170,0.2)] shadow-black/50"
                  : "bg-[#2a2a2e] border border-[rgba(255,255,255,0.08)] shadow-black/30"
              }`}
            >
              {/* Photo */}
              <div className="w-[160px] h-[160px] rounded-xl overflow-hidden flex-shrink-0 border border-[rgba(255,255,255,0.08)]">
                <Image
                  src="/gulshan.jpeg"
                  alt="Gulshan Kumar"
                  width={320}
                  height={320}
                  quality={100}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-zinc-100 tracking-tight font-mono">
                  gulshank0
                </h3>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-mono text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group"
                    >
                      <span className="text-zinc-500 group-hover:text-zinc-300">
                        [
                      </span>
                      <span className="underline underline-offset-2 decoration-zinc-600 group-hover:decoration-zinc-400">
                        {link.label}
                      </span>
                      <span className="text-zinc-500 group-hover:text-zinc-300">
                        ]
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
