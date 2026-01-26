"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedResumeButton } from "./resume-button";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      {/* Resume Button - Top Right Corner - Hidden on mobile as it's in sidebar */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 hidden sm:block">
        <AnimatedResumeButton />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {/* Responsive shapes - smaller on mobile */}
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-20%] sm:left-[-10%] lg:left-[-5%] top-[15%] md:top-[20%] scale-50 sm:scale-75 lg:scale-100"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-15%] sm:right-[-5%] lg:right-[0%] top-[70%] md:top-[75%] scale-50 sm:scale-75 lg:scale-100"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%] scale-50 sm:scale-75 lg:scale-100"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[10%] sm:right-[15%] lg:right-[20%] top-[10%] md:top-[15%] scale-50 sm:scale-75 lg:scale-100"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[15%] sm:left-[20%] lg:left-[25%] top-[5%] md:top-[10%] scale-50 sm:scale-75 lg:scale-100"
        />
      </div>

      {/* Main content - responsive with sidebar offset on desktop only */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:pl-64">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 sm:mb-8 lg:mb-12"
          ></motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile image - responsive sizing */}
            <div className="flex items-center justify-center">
              <div className="bg-[url(/gulshan.jpeg)] h-32 w-32 sm:h-40 sm:w-40 lg:h-50 lg:w-50 rounded-full bg-cover bg-center mb-6 sm:mb-8"></div>
            </div>

            {/* Name - responsive text size */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 mb-3 sm:mb-4 leading-tight tracking-wide">
              Gulshan Kumar
            </h2>

            {/* Tagline - responsive text size and padding */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 sm:px-0 pt-4 sm:pt-6 lg:pt-8">
              Developing exceptional digital experiences through innovative Idea
              and cutting-edge technology.
            </p>

            {/* Social buttons - responsive layout */}
            <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 gap-3 sm:gap-4">
              <a
                href="https://github.com/gulshank0"
                className="w-full max-w-[280px] sm:max-w-[320px] inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-transparent border border-white/[0.08] rounded-md hover:bg-white/[0.03] shadow-md hover:shadow-lg transition duration-200 ease-in-out"
              >
                <Github className="mr-2 sm:mr-3" size={14} />
                GitHub
              </a>

              <a
                href="https://x.com/gulshank0"
                className="w-full max-w-[280px] sm:max-w-[320px] inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-transparent border border-white/[0.08] rounded-md hover:bg-white/[0.03] shadow-md hover:shadow-lg transition duration-200 ease-in-out"
              >
                <Twitter className="mr-2 sm:mr-3" size={14} />
                Twitter
              </a>

              <a
                href="https://www.linkedin.com/in/gulshan-kumar-872512270/"
                className="w-full max-w-[280px] sm:max-w-[320px] inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-transparent border border-white/[0.08] rounded-md hover:bg-white/[0.03] transition duration-200 ease-in-out"
              >
                <Linkedin className="mr-2 sm:mr-3" size={14} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
