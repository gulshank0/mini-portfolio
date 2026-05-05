"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Clock, FileText } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import Image from "next/image";
import ProfileToast from "../ProfileToast";

export default function HeroIntro() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const { theme } = useTheme();

  const handleCloseToast = useCallback(() => setShowToast(false), []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }) + " GMT+5:30",
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.6&longitude=77.2&current_weather=true",
        );
        const data = await res.json();
        setWeather(`${Math.round(data.current_weather.temperature)}°C`);
      } catch {
        setWeather("--°C");
      }
    }
    fetchWeather();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section id="intro" className="pt-8 pb-16 px-4 sm:px-6">
      {/* Header: Weather + Time */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between mb-12 text-sm text-[var(--muted-foreground)]"
      >
        <div className="flex items-center gap-1.5">
          <Cloud className="w-4 h-4" strokeWidth={1.5} />
          <span className="font-mono text-xs">{weather ?? "..."}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" strokeWidth={1.5} />
          <span className="font-mono text-xs">{time || "..."}</span>
        </div>
      </motion.div>

      {/* Profile */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3 mb-6"
      >
        <button
          onClick={() => setShowToast(true)}
          className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 text-left group"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] flex-shrink-0 transition-all duration-200 group-hover:border-[var(--muted-foreground)] group-hover:shadow-md">
            <Image
              src="/gulshan.jpeg"
              alt="Gulshan Kumar"
              width={96}
              height={96}
              quality={100}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-base font-semibold text-[var(--foreground)] leading-tight group-hover:underline underline-offset-2">
              Gulshan Kumar
            </h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Full Stack Developer
            </p>
          </div>
        </button>
      </motion.div>

      {/* Profile Toast */}
      <ProfileToast isOpen={showToast} onClose={handleCloseToast} />

      {/* Bio */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="space-y-4 mb-8"
      >
        <p className="text-[15px] leading-relaxed text-[var(--foreground)] opacity-80">
          Hey, I&apos;m Gulshan Kumar. I&apos;m a Full Stack Developer
          passionate about building exceptional digital experiences through
          innovative ideas and cutting-edge technology. Currently contributing
          to open-source projects at{" "}
          <a
            href="https://github.com/gulshank0"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 decoration-[var(--muted-foreground)] hover:decoration-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>{" "}
          , based in India 🇮🇳
        </p>
        <p className="text-[15px] leading-relaxed text-[var(--foreground)] opacity-80">
          I love working at the intersection of design and engineering, with a
          focus on building user-first and scalable products, systems, and
          tools.
        </p>
      </motion.div>

      {/* Resume Button */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <motion.a
          href="https://drive.google.com/file/d/1VR48vIfsejNA1NsoAx6hwGBOMkljtvJ1/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            theme === "dark"
              ? "metallic-btn"
              : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
          }`}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <FileText className="w-4 h-4" strokeWidth={1.8} />
          View Resume
          <span
            className={`ml-1 text-[10px] font-mono uppercase tracking-wider ${
              theme === "dark" ? "text-[var(--metallic-2)]" : "opacity-60"
            }`}
          >
            PDF
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
