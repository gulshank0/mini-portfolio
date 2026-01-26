import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "RBased GIS System",
    description:
      "Full-stack platform for RBased organisation with modern UI and robust backend.",
    image: "/img-1.png",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    liveUrl: "https://rbased-pvt-ltd-five.vercel.app/",
    githubUrl: "https://github.com/gulshank0/rbased-pvt-ltd",
    status: "Live",
    statusColor: "bg-emerald-500",
  },
  {
    title: "Happy Heads",
    description:
      "Full-stack application built with modern web technologies for managing and organizing content.",
    image: "/happy.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/gulshank0/Happy-heads",
    status: "Live",
    statusColor: "bg-emerald-500",
  },
  {
    title: "RevShare",
    description:
      "YouTube Channel Exchange Platform for revenue-sharing and fractional stakes.",
    image: "/revShare.png",
    tags: ["Next.js 14", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/gulshank0/RevShare",
    status: "Building",
    statusColor: "bg-amber-500",
  },
  {
    title: "Document Organiser",
    description:
      "Smart document management app for efficient organization and categorization.",
    image: "/s-docs.png",
    tags: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/gulshank0/Document-Orgeaniser",
    status: "Building",
    statusColor: "bg-amber-500",
  },
];

export default function Projects() {
  return (
    <div className="flex flex-col gap-6 pt-24 pb-16 px-6 ml-64 bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-8 text-white bg-clip-text text-transparent">
          My Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              {/* Image Container */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  width={400}
                  height={200}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`${project.statusColor} text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1`}
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1.5 text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-800/80 text-gray-300 text-xs px-2 py-0.5 rounded-md border border-gray-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      project.liveUrl ? "flex-1" : "w-full"
                    } flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded-lg border border-gray-700 transition-colors`}
                  >
                    <Github size={14} />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
