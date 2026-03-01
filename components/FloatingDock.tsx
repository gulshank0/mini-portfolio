"use client";

import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  Wrench,
  GitPullRequest,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const dockItems = [
  { icon: Home, label: "Home", href: "#intro" },
  { icon: Briefcase, label: "Work", href: "#work" },
  { icon: Wrench, label: "Skills", href: "#skills" },
  { icon: GitPullRequest, label: "GitHub", href: "#github" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export default function FloatingDock() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 120 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-3 py-2 shadow-lg shadow-black/5"
    >
      <div className="flex items-center gap-1">
        {dockItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="relative group p-2.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors duration-200"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title={item.label}
          >
            <item.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-800 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </motion.a>
        ))}

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--border)] mx-0.5" />

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="relative group p-2.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title={theme === "light" ? "Dark mode" : "Light mode"}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {theme === "light" ? (
              <Moon className="w-[18px] h-[18px]" strokeWidth={1.8} />
            ) : (
              <Sun className="w-[18px] h-[18px]" strokeWidth={1.8} />
            )}
          </motion.div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-800 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
