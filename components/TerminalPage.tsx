"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ─── Data ──────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Gulshan Kumar",
  role: "Full Stack Developer",
  location: "India 🇮🇳",
  bio: [
    "Passionate about building exceptional digital experiences",
    "through innovative ideas and cutting-edge technology.",
    "Currently contributing to open-source projects.",
    "Focus on user-first and scalable products, systems, and tools.",
  ],
  github: "https://github.com/gulshank0",
  email: "gulshankumar8430@gmail.com",
  linkedin: "https://linkedin.com/in/gulshank0",
  twitter: "https://twitter.com/gulshank0",
};

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Docker",
  "Kubernetes",
  "Redis",
  "Kafka",
  "Git",
  "GitHub",
  "Tailwind CSS",
  "WebRTC",
  "Terraform",
  "Jenkins",
  "Prometheus",
  "Grafana",
  "Stripe",
  "Vercel",
  "Turborepo",
];

const PROJECTS = [
  {
    name: "RBased GIS System",
    desc: "Full-stack platform for RBased organisation with modern UI and robust backend.",
    tech: "Next.js · PostgreSQL · Prisma",
    url: "https://rbased-pvt-ltd-five.vercel.app/",
    github: "https://github.com/gulshank0/rbased-pvt-ltd",
  },
  {
    name: "Tars Chat App",
    desc: "Real-time chat application with modern UI, live messaging, and seamless UX.",
    tech: "TypeScript · Next.js · WebSocket",
    url: "https://tars-chat-app-eta.vercel.app",
    github: "https://github.com/gulshank0/tars-chat-app",
  },
  {
    name: "Bolt Clone",
    desc: "AI-powered code editor clone — generate, edit, and preview code with AI.",
    tech: "TypeScript · React · Node.js",
    github: "https://github.com/gulshank0/bolt-clone",
  },
  {
    name: "Happy Heads",
    desc: "Full-stack application for managing and organizing content.",
    tech: "Next.js · TypeScript · PostgreSQL",
    github: "https://github.com/gulshank0/Happy-heads",
  },
  {
    name: "RevShare",
    desc: "YouTube Channel Exchange Platform for revenue-sharing and fractional stakes.",
    tech: "Next.js 14 · PostgreSQL · Stripe",
    github: "https://github.com/gulshank0/RevShare",
  },
  {
    name: "Document Organiser",
    desc: "Smart document management app for efficient organization.",
    tech: "React · TypeScript · Node.js",
    github: "https://github.com/gulshank0/Documents-Organiser",
  },
];

const ASCII_BANNER = `
 ██████╗ ██╗   ██╗██╗     ███████╗██╗  ██╗ █████╗ ███╗   ██╗
██╔════╝ ██║   ██║██║     ██╔════╝██║  ██║██╔══██╗████╗  ██║
██║  ███╗██║   ██║██║     ███████╗███████║███████║██╔██╗ ██║
██║   ██║██║   ██║██║     ╚════██║██╔══██║██╔══██║██║╚██╗██║
╚██████╔╝╚██████╔╝███████╗███████║██║  ██║██║  ██║██║ ╚████║
 ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`;

const NEOFETCH_ART = String.raw`
        .--.         guest@gulshan
       |o_o |        ─────────────────
       |:_/ |        OS: Portfolio v1.0
      //   \ \       Host: Vercel Edge
     (|     | )      Kernel: Next.js 16
    /'\_   _/\'\      Shell: gulsh 1.0
    \___)=(___/      Terminal: hacker-term
                     Uptime: ∞
                     Packages: 27 (npm)
                     Resolution: Unlimited
                     Theme: Matrix Green
                     CPU: Brain @ 3.2GHz
                     Memory: ∞ / ∞ MB`;

const CMATRIX_ART = `
  ┌──────────────────────────────────────────────────────┐
  │  ░▒▓ C M A T R I X ▓▒░                              │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │  1  0  ア 0  1  カ 0  1  サ 1  0  タ 0  1  ナ 0  1  │
  │  0  キ 1  0  シ 1  0  チ 1  0  ニ 1  0  ヒ 1  0  1  │
  │  ク 0  1  ス 0  1  ツ 0  1  ヌ 0  1  フ 0  1  0  1  │
  │  1  ケ 0  1  セ 0  1  テ 0  1  ネ 0  1  ヘ 0  1  0  │
  │  コ 1  0  ソ 1  0  ト 1  0  ノ 1  0  ホ 1  0  1  0  │
  │  0  1  ア 0  1  カ 0  1  サ 1  0  タ 0  1  ナ 0  1  │
  │  1  0  キ 1  0  シ 1  0  チ 1  0  ニ 1  0  ヒ 1  0  │
  │  0  ク 0  1  ス 0  1  ツ 0  1  ヌ 0  1  フ 0  1  1  │
  │  ケ 1  0  1  セ 0  1  テ 0  1  ネ 0  1  ヘ 0  1  0  │
  │  1  コ 1  0  ソ 1  0  ト 1  0  ノ 1  0  ホ 1  0  1  │
  │  0  1  0  ア 0  1  カ 0  1  サ 1  0  タ 0  1  ナ 0  │
  │  マ 0  ミ 1  ム 0  メ 1  モ 0  ヤ 1  ユ 0  ヨ 1  0  │
  │                                                      │
  │  "Follow the white rabbit..."  🐇                    │
  │  Press any key to exit the Matrix.                   │
  └──────────────────────────────────────────────────────┘`;

const HTOP_ART = `
  ┌──────────────────────────────────────────────────────┐
  │  ░▒▓ H T O P  —  System Monitor ▓▒░                 │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │  CPU  1 [████████████████████░░░░░░░░░░░  65.2%]     │
  │  CPU  2 [███████████░░░░░░░░░░░░░░░░░░░  38.7%]     │
  │  CPU  3 [██████████████████████████░░░░  82.1%]     │
  │  CPU  4 [█████░░░░░░░░░░░░░░░░░░░░░░░░  17.4%]     │
  │  Mem  [ ██████████████████░░░░░░░ 4.2G / 8.0G ]     │
  │  Swp  [ ██░░░░░░░░░░░░░░░░░░░░░░ 0.3G / 2.0G ]     │
  │                                                      │
  │  PID   USER     CPU%  MEM%  CMD                      │
  │  ─────────────────────────────────────────────       │
  │  1337  gulshan  42.0  12.1  next-server              │
  │  1338  gulshan  18.5   8.4  node                     │
  │  1340  gulshan  12.3   6.2  typescript-compiler      │
  │  1342  gulshan   8.7   4.1  eslint                   │
  │  1345  gulshan   5.2   3.8  tailwindcss              │
  │  1350  gulshan   3.1   2.9  vite-hmr                 │
  │  1355  gulshan   1.4   1.2  git-daemon               │
  │  1360  system    0.8   0.5  portfolio-watcher        │
  │                                                      │
  │  Tasks: 42 total, 3 running, 39 sleeping             │
  │  Load average: 1.37, 0.92, 0.68                      │
  │  Uptime: that's classified 🤫                        │
  └──────────────────────────────────────────────────────┘`;

// ─── Types ─────────────────────────────────────────────────────────────────────

interface TerminalLine {
  id: number;
  type: "input" | "output" | "ascii" | "error" | "system";
  content: string;
}

// ─── Command Processor ────────────────────────────────────────────────────────

function processCommand(raw: string): TerminalLine[] {
  const cmd = raw.trim().toLowerCase();
  const id = () => Date.now() + Math.random();

  if (!cmd) return [];

  switch (cmd) {
    case "help": {
      const cmds: [string, string][] = [
        ["help", "Show this help menu"],
        ["about", "Display profile & bio"],
        ["skills", "List tech stack"],
        ["projects", "Show all projects"],
        ["contact", "Show contact info"],
        ["whoami", "Who are you?"],
        ["neofetch", "System information"],
        ["cmatrix", "Enter the Matrix"],
        ["htop", "System monitor"],
        ["history", "Show command history"],
        ["clear", "Clear terminal"],
        ["exit", "Return to portfolio"],
        ["sudo rm -rf /", "¯\\_(ツ)_/¯"],
      ];
      // Box width = 62 inner chars
      const W = 62;
      const top = `  ┌${"─".repeat(W)}┐`;
      const hdr = `  │${"AVAILABLE COMMANDS".padStart(Math.floor((W + 18) / 2)).padEnd(W)}│`;
      const sep = `  ├${"─".repeat(16)}┬${"─".repeat(W - 17)}┤`;
      const bot = `  └${"─".repeat(16)}┴${"─".repeat(W - 17)}┘`;
      const rows = cmds
        .map(([c, d]) => `  │  ${c.padEnd(13)} │  ${d.padEnd(W - 19)} │`)
        .join("\n");
      return [
        {
          id: id(),
          type: "output",
          content: `\n${top}\n${hdr}\n${sep}\n${rows}\n${bot}`,
        },
      ];
    }

    case "about":
      return [
        {
          id: id(),
          type: "output",
          content: `
  ╔════════════════════════════════════════════════════════════╗
  ║  ${PROFILE.name.padEnd(56)}║
  ║  ${PROFILE.role.padEnd(56)}║
  ║  📍 ${PROFILE.location.padEnd(54)}║
  ╚════════════════════════════════════════════════════════════╝

${PROFILE.bio.map((l) => `  → ${l}`).join("\n")}

  GitHub  : ${PROFILE.github}
  LinkedIn: ${PROFILE.linkedin}`,
        },
      ];

    case "skills": {
      const W = 62;
      const top = `  ┌─ TECH STACK ${"─".repeat(W - 13)}┐`;
      const blank = `  │${" ".repeat(W)}│`;
      const bot = `  └${"─".repeat(W)}┘`;
      const rows = SKILLS.reduce((acc, skill, i) => {
        const col = i % 3;
        const padded = skill.padEnd(16);
        if (col === 0) acc += "  │  ";
        acc += `▸ ${padded}`;
        if (col === 2 || i === SKILLS.length - 1) {
          // Pad remaining columns
          const filled = (col + 1) * 18 + 2;
          acc += " ".repeat(Math.max(0, W - filled));
          acc += "│\n";
        }
        return acc;
      }, "");

      return [
        {
          id: id(),
          type: "output",
          content: `\n${top}\n${blank}\n${rows}${blank}\n${bot}\n\n  Total: ${SKILLS.length} technologies loaded.`,
        },
      ];
    }

    case "projects": {
      const W = 62;
      const content = PROJECTS.map((p, i) => {
        const top = `  ┌─ PROJECT ${String(i + 1).padStart(2, "0")} ${"─".repeat(W - 15)}┐`;
        const bot = `  └${"─".repeat(W)}┘`;
        const name = `  │  ${p.name.padEnd(W - 4)}│`;
        const desc = `  │  ${p.desc.substring(0, W - 4).padEnd(W - 4)}│`;
        const tech = `  │  Tech: ${p.tech.substring(0, W - 10).padEnd(W - 10)}│`;
        const gh = `  │  GitHub: ${p.github.substring(0, W - 12).padEnd(W - 12)}│`;
        const live = p.url
          ? `\n  │  Live:   ${p.url.substring(0, W - 12).padEnd(W - 12)}│`
          : "";
        return `${top}\n${name}\n${desc}\n${tech}\n${gh}${live}\n${bot}`;
      }).join("\n\n");

      return [
        {
          id: id(),
          type: "output",
          content: `\n${content}`,
        },
      ];
    }

    case "contact":
      return [
        {
          id: id(),
          type: "output",
          content: `
  ╔═══════════════════════════════════════════╗
  ║           CONTACT INFORMATION             ║
  ╠═══════════════════════════════════════════╣
  ║  📧 Email   : ${PROFILE.email.padEnd(25)} ║
  ║  🐙 GitHub  : gulshank0                   ║
  ║  🔗 LinkedIn: gulshank0                   ║
  ║  🐦 Twitter : gulshank0                   ║
  ╚═══════════════════════════════════════════╝`,
        },
      ];

    case "whoami":
      return [
        {
          id: id(),
          type: "output",
          content: `
  ┌─────────────────────────────────────────────┐
  │  ACCESS GRANTED                              │
  │────────────────────────────────────────────│
  │  User     : guest                           │
  │  Clearance: VISITOR                         │
  │  Status   : AUTHENTICATED                   │
  │  Session  : ${new Date().toISOString().padEnd(31)} │
  │                                             │
  │  Welcome to Gulshan's system.               │
  │  Type 'help' to see available commands.     │
  └─────────────────────────────────────────────┘`,
        },
      ];

    case "neofetch":
      return [{ id: id(), type: "ascii", content: NEOFETCH_ART }];

    case "cmatrix":
      return [{ id: id(), type: "ascii", content: CMATRIX_ART }];

    case "htop":
      return [{ id: id(), type: "ascii", content: HTOP_ART }];

    case "sudo rm -rf /":
    case "sudo rm -rf":
      return [
        {
          id: id(),
          type: "error",
          content: `
  ⚠️  Permission denied. Nice try though 😏
  
  [SYSTEM] Incident reported to admin.
  [SYSTEM] Your IP has been logged... just kidding.
  [SYSTEM] But seriously, don't do that.`,
        },
      ];

    case "exit":
      return [
        {
          id: id(),
          type: "system",
          content: "  Closing terminal session... Goodbye! 👋",
        },
      ];

    default:
      return [
        {
          id: id(),
          type: "error",
          content: `  bash: ${raw.trim()}: command not found\n  Type 'help' for available commands.`,
        },
      ];
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function TerminalPage() {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    setLines([]);
    setBooted(false);

    const bootLines: TerminalLine[] = [
      { id: 1, type: "ascii", content: ASCII_BANNER },
      {
        id: 2,
        type: "system",
        content: "  ▸ Initializing system...",
      },
      {
        id: 3,
        type: "system",
        content: "  ▸ Loading portfolio modules...",
      },
      {
        id: 4,
        type: "system",
        content: "  ▸ Establishing secure connection...",
      },
      {
        id: 5,
        type: "system",
        content: `  ▸ Session started: ${new Date().toLocaleString()}`,
      },
      { id: 6, type: "output", content: "" },
      {
        id: 7,
        type: "output",
        content:
          '  Welcome to Gulshan\'s terminal. Type "help" to get started.',
      },
      { id: 8, type: "output", content: "" },
    ];

    let currentIndex = 0;
    let cancelled = false;

    const interval = setInterval(() => {
      if (cancelled) return;
      if (currentIndex < bootLines.length) {
        const line = bootLines[currentIndex];
        setLines((prev) => [...prev, line]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setBooted(true);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input
  useEffect(() => {
    if (booted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [booted]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      const cmd = input.trim();

      // Add input line
      const inputLine: TerminalLine = {
        id: Date.now(),
        type: "input",
        content: cmd,
      };

      // Process command
      const outputLines = processCommand(cmd);

      setLines((prev) => [...prev, inputLine, ...outputLines]);
      setCmdHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setInput("");

      // Handle exit
      if (cmd.toLowerCase() === "exit") {
        setTimeout(() => router.push("/"), 1200);
      }

      // Handle clear
      if (cmd.toLowerCase() === "clear") {
        setTimeout(() => setLines([]), 100);
      }

      // Handle history command
      if (cmd.toLowerCase() === "history") {
        const historyOutput: TerminalLine = {
          id: Date.now() + 1,
          type: "output",
          content: cmdHistory.length
            ? cmdHistory
                .map((c, i) => `  ${String(i + 1).padStart(4)}  ${c}`)
                .join("\n")
            : "  No commands in history.",
        };
        setLines((prev) => [...prev, historyOutput]);
      }
    },
    [input, cmdHistory, router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cmdHistory.length > 0) {
          const newIndex =
            historyIndex === -1
              ? cmdHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(cmdHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= cmdHistory.length) {
            setHistoryIndex(-1);
            setInput("");
          } else {
            setHistoryIndex(newIndex);
            setInput(cmdHistory[newIndex]);
          }
        }
      }
    },
    [cmdHistory, historyIndex],
  );

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const getLineClassName = (type: TerminalLine["type"]): string => {
    const classMap: Record<TerminalLine["type"], string> = {
      input: "terminal-line-input",
      error: "terminal-line-error",
      system: "terminal-line-system",
      ascii: "terminal-line-ascii",
      output: "terminal-line-output",
    };
    return classMap[type];
  };

  return (
    <div
      className="terminal-container"
      onClick={focusInput}
      onKeyDown={focusInput}
      role="application"
      tabIndex={0}
    >
      {/* Scanline overlay */}
      <div className="terminal-scanlines" />

      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <button
            className="terminal-dot terminal-dot-red"
            onClick={() => router.push("/")}
            aria-label="Close terminal"
          />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">guest@gulshan:~</span>
        <div className="w-[52px]" />
      </div>

      {/* Terminal body */}
      <div className="terminal-body" ref={scrollRef}>
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`terminal-line ${getLineClassName(line.type)}`}
            >
              {line.type === "input" && (
                <span className="terminal-prompt">guest@gulshan:~$ </span>
              )}
              <span className="whitespace-pre-wrap">{line.content}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input line */}
        {booted && (
          <motion.form
            onSubmit={handleSubmit}
            className="terminal-input-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="terminal-prompt">guest@gulshan:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
            <span className="terminal-caret" />
          </motion.form>
        )}

        {/* Boot loading indicator */}
        {!booted && (
          <div className="terminal-loading">
            <span className="terminal-loading-dot">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
