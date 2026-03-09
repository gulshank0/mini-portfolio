"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Check,
  CalendarDays,
  ListTodo,
  ArrowLeft,
  Flame,
  Zap,
  Minus,
} from "lucide-react";
import Link from "next/link";

type Priority = "low" | "med" | "high";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  low: {
    label: "Low",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    icon: <Minus className="w-3 h-3" />,
  },
  med: {
    label: "Med",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: <Zap className="w-3 h-3" />,
  },
  high: {
    label: "High",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    icon: <Flame className="w-3 h-3" />,
  },
};

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("med");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const storageKey = `todo-${getTodayKey()}`;

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify(todos));
    }
  }, [todos, mounted, storageKey]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const completed = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  // Progress ring SVG params
  const ringRadius = 28;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progress / 100) * ringCircumference;

  if (!mounted) return null;

  return (
    <div className="todo-page">
      {/* Background grain */}
      <div className="todo-bg-grain" />

      <div className="todo-container">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="todo-back-link">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          className="todo-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="todo-header-left">
            <div className="todo-header-icon">
              <ListTodo className="w-6 h-6" />
            </div>
            <div>
              <h1 className="todo-title">Daily Todos</h1>
              <div className="todo-date">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{formatDate()}</span>
              </div>
            </div>
          </div>

          {/* Progress ring */}
          <div className="todo-progress">
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                r={ringRadius}
                fill="none"
                stroke="var(--todo-ring-track)"
                strokeWidth="4"
              />
              <motion.circle
                cx="36"
                cy="36"
                r={ringRadius}
                fill="none"
                stroke="var(--todo-ring-fill)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                initial={{ strokeDashoffset: ringCircumference }}
                animate={{ strokeDashoffset: ringOffset }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                transform="rotate(-90 36 36)"
              />
            </svg>
            <div className="todo-progress-text">
              <span className="todo-progress-count">{completed}</span>
              <span className="todo-progress-total">/{total}</span>
            </div>
          </div>
        </motion.header>

        {/* Add task */}
        <motion.div
          className="todo-add-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
            className="todo-add-form"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done today?"
              className="todo-input"
              autoFocus
            />
            <div className="todo-add-controls">
              {/* Priority selector */}
              <div className="todo-priority-selector">
                {(["low", "med", "high"] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`todo-priority-btn ${priority === p ? "active" : ""}`}
                    style={
                      priority === p
                        ? {
                            background: PRIORITY_CONFIG[p].bg,
                            color: PRIORITY_CONFIG[p].color,
                            borderColor: PRIORITY_CONFIG[p].color,
                          }
                        : {}
                    }
                  >
                    {PRIORITY_CONFIG[p].icon}
                    {PRIORITY_CONFIG[p].label}
                  </button>
                ))}
              </div>
              <motion.button
                type="submit"
                className="todo-add-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim()}
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Task list */}
        <motion.div
          className="todo-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="popLayout">
            {todos.length === 0 && (
              <motion.div
                key="empty"
                className="todo-empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ListTodo className="w-12 h-12 opacity-20" />
                <p>No tasks for today yet.</p>
                <p className="todo-empty-sub">
                  Start by adding your first task above!
                </p>
              </motion.div>
            )}

            {todos.map((todo) => {
              const pc = PRIORITY_CONFIG[todo.priority];
              return (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
                >
                  {/* Priority indicator line */}
                  <div
                    className="todo-item-priority-line"
                    style={{ background: pc.color }}
                  />

                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                    style={
                      todo.completed
                        ? { background: pc.color, borderColor: pc.color }
                        : { borderColor: pc.color }
                    }
                  >
                    <AnimatePresence>
                      {todo.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Text */}
                  <span className="todo-item-text">{todo.text}</span>

                  {/* Priority badge */}
                  <span
                    className="todo-item-badge"
                    style={{ background: pc.bg, color: pc.color }}
                  >
                    {pc.icon}
                    {pc.label}
                  </span>

                  {/* Delete */}
                  <motion.button
                    onClick={() => deleteTodo(todo.id)}
                    className="todo-delete-btn"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats footer */}
        {total > 0 && (
          <motion.div
            className="todo-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>
              {total} task{total !== 1 ? "s" : ""}
            </span>
            <span className="todo-stats-dot">•</span>
            <span>{completed} completed</span>
            <span className="todo-stats-dot">•</span>
            <span>{total - completed} remaining</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
