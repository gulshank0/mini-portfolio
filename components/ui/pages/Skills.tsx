"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
  SiNextdotjs,
  SiVercel,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiWebrtc,
  SiShadcnui,
  SiLeetcode,
  SiPrometheus,
  SiTerraform,
  SiJenkins,
  SiGrafana,
  SiKubernetes,
  SiKibana,
  SiRedis,
  SiStripe,
  SiApachekafka,
} from "react-icons/si";

const skills = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26", progress: 95 },
  { name: "CSS", icon: SiCss3, color: "#1572B6", progress: 90 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", progress: 92 },
  { name: "React", icon: SiReact, color: "#61DAFB", progress: 88 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", progress: 85 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", progress: 80 },
  { name: "tRPC", icon: SiTrpc, color: "#2596BE", progress: 70 },
  { name: "Turborepo", icon: SiTurborepo, color: "#EF4444", progress: 65 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", progress: 72 },
  { name: "Express", icon: SiExpress, color: "#000000", progress: 85 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", progress: 78 },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", progress: 76 },
  { name: "SQL", icon: SiPostgresql, color: "#4169E1", progress: 82 },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", progress: 90 },
  { name: "Vercel", icon: SiVercel, color: "#000000", progress: 88 },
  { name: "Git", icon: SiGit, color: "#F05032", progress: 95 },
  { name: "GitHub", icon: SiGithub, color: "#181717", progress: 90 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", progress: 85 },
  { name: "WebRTC", icon: SiWebrtc, color: "#4A90E2", progress: 70 },
  { name: "shadcn/ui", icon: SiShadcnui, color: "#FBBF24", progress: 75 },
  { name: "Leetcode", icon: SiLeetcode, color: "#FBBF24", progress: 75 },
  { name: "prometheus", icon: SiPrometheus, color: "#FBBF24", progress: 75 },
  { name: "grafana", icon: SiGrafana, color: "#FBBF24", progress: 75 },
  { name: "kubernetes", icon: SiKubernetes, color: "#FBBF24", progress: 75 },
  { name: "terraform", icon: SiTerraform, color: "#FBBF24", progress: 75 },
  { name: "kibana", icon: SiKibana, color: "#FBBF24", progress: 75 },
  { name: "jenkins", icon: SiJenkins, color: "#FBBF24", progress: 75 },
  { name: "redis", icon: SiRedis, color: "#FBBF24", progress: 75 },
  { name: "stripe", icon: SiStripe, color: "#FBBF24", progress: 75 },
  { name: "kafka", icon: SiApachekafka, color: "#FBBF24", progress: 75 },
];

export default function Skills() {
  return (
    <div className="space-y-6 sm:space-y-8 py-4 sm:py-6 px-4 sm:px-6 lg:ml-64 bg-black backdrop-blur-sm border-b border-purple-500/20">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-center text-gray-200 font-bold gradient-text">
        My Tools
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-purple-900/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-2 sm:p-3 md:p-4">
          <div className="flex flex-col items-center justify-center">
            <skill.icon
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2"
              style={{ color: skill.color }}
            />
            <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-purple-100 text-center leading-tight">
              {skill.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
