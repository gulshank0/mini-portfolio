"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SiCss3,
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
        
      ];
      


export default function Skills() {  
    return (
        <div className="space-y-8 py-6 px-6 pb-35 pt-40 bg-black backdrop-blur-sm border-b border-purple-500/20">
        <h1 className="lg:text-3xl text-xl text-center text-gray-200 font-bold gradient-text">My Tools</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-purple-900/50 to-gray-900/50 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center">
                  <skill.icon
                    className="w-12 h-12 mb-3"
                    style={{ color: skill.color }}
                  />
                  <h3 className="lg:text-lg text-sm font-semibold text-purple-100">
                    {skill.name}
                  </h3>
                </div>
                {/* <Progress value={skill.progress} className="h-2 bg-purple-950" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" /> */}
              </CardContent>
            </Card>
          </motion.div>
        );
      }