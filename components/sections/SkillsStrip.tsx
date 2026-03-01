"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiRedis,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiPrisma,
  SiStripe,
  SiPrometheus,
  SiGrafana,
  SiTerraform,
  SiJenkins,
  SiApachekafka,
  SiHtml5,
  SiCss3,
  SiWebrtc,
  SiVercel,
  SiTurborepo,
  SiShadcnui,
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#888" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#888" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", icon: SiPrisma, color: "#888" },
  {name:"Turborepo", icon:SiTurborepo, color:"#888" },
  {name:"Shadcn/UI", icon:SiShadcnui, color:"#888" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Kafka", icon: SiApachekafka, color: "#888" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
  { name: "Grafana", icon: SiGrafana, color: "#F46800" },
  { name: "Terraform", icon: SiTerraform, color: "#844FBA" },
  { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#888" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "WebRTC", icon: SiWebrtc, color: "#888" },
  { name: "Vercel", icon: SiVercel, color: "#888" },
];

export default function SkillsStrip() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-4">Technologies I Work With</p>
        <div className="flex items-center gap-2.5 flex-wrap mb-10">
          {[
            { name: "React", color: "#61DAFB" },
            { name: "Next.js", color: "#888" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Node.js", color: "#339933" },
            { name: "PostgreSQL", color: "#4169E1" },
            { name: "Docker", color: "#2496ED" },
            { name: "Kubernetes", color: "#326CE5" },
            { name: "Redis", color: "#DC382D" },
          ].map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              {tech.name}
            </span>
          ))}
        </div>

        <p className="section-label mb-6">Tools & Technologies</p>
      </motion.div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-200 cursor-default"
          >
            <skill.icon
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200"
              style={{ color: skill.color }}
            />
            <span className="text-[10px] sm:text-[11px] font-medium text-[var(--muted-foreground)] text-center leading-tight">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
