"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "RBased GIS System",
    description:
      "Full-stack platform for RBased organisation with modern UI and robust backend.",
    image: "/img-1.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    category: "FULL STACK",
    liveUrl: "https://rbased-pvt-ltd-five.vercel.app/",
    githubUrl: "https://github.com/gulshank0/rbased-pvt-ltd",
  },
  {
    title: "Tars Chat App",
    description:
      "Real-time chat application with modern UI, live messaging, and seamless user experience.",
    image: "/chat.png",
    tags: ["TypeScript", "Next.js", "WebSocket"],
    category: "REAL-TIME",
    liveUrl: "https://tars-chat-app-eta.vercel.app",
    githubUrl: "https://github.com/gulshank0/tars-chat-app",
  },
  {
    title: "Bolt Clone",
    description:
      "AI-powered code editor clone — generate, edit, and preview code with an intelligent assistant.",
    image: "/amazon.jpg",
    tags: ["TypeScript", "React", "Node.js"],
    category: "AI TOOL",
    githubUrl: "https://github.com/gulshank0/bolt-clone",
  },
  {
    title: "Happy Heads",
    description:
      "Full-stack application built with modern web technologies for managing and organizing content.",
    image: "/happy.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    category: "FULL STACK",
    githubUrl: "https://github.com/gulshank0/Happy-heads",
  },
  {
    title: "RevShare",
    description:
      "YouTube Channel Exchange Platform for revenue-sharing and fractional stakes.",
    image: "/revShare.png",
    tags: ["Next.js 14", "PostgreSQL", "Stripe"],
    category: "WEB APP",
    githubUrl: "https://github.com/gulshank0/RevShare",
  },
  {
    title: "Document Organiser",
    description:
      "Smart document management app for efficient organization and categorization.",
    image: "/s-docs.png",
    tags: ["React", "TypeScript", "Node.js"],
    category: "PRODUCTIVITY",
    githubUrl: "https://github.com/gulshank0/Documents-Organiser",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">Work</p>
        <p className="text-[15px] text-[var(--muted-foreground)] mb-8">
          Below are some select projects from the world of development
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block rounded-2xl overflow-hidden bg-[var(--card)] border border-[var(--border)] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300"
          >
            {/* Category Tag */}
            <div className="px-5 pt-5 pb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium tracking-wider text-[var(--muted-foreground)] uppercase">
                ✦ {project.category}
              </span>
            </div>

            {/* Title + Description */}
            <div className="px-5 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1.5 group-hover:opacity-80 transition-opacity leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed uppercase font-mono tracking-wide">
                {project.tags.join(" · ")}
              </p>
            </div>

            {/* Image */}
            <div className="relative mx-4 mb-4 rounded-xl overflow-hidden bg-[var(--muted)]">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={340}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--background)] backdrop-blur-sm rounded-full p-2.5 shadow-lg border border-[var(--border)]">
                  <ExternalLink className="w-4 h-4 text-[var(--foreground)]" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
