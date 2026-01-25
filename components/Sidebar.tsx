"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "./ui/logo";
import { AnimatedResumeButton } from "./ui/resume-button";
import { Home, Code2, FolderKanban, Mail, X, Menu } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href.split("#")[1];
    window.scrollTo({
      top: document.getElementById(href)?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const navItems = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#skills", label: "Skills", icon: Code2 },
    { href: "#projects", label: "Projects", icon: FolderKanban },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Floating Open Button - Visible when sidebar is closed */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 left-6 z-50 p-3 rounded-xl bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/30 transition-all duration-300 shadow-lg shadow-purple-500/20 ${
          isOpen
            ? "opacity-0 pointer-events-none scale-90"
            : "opacity-100 scale-100"
        }`}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-black/10 backdrop-blur-2xl border-r border-purple-500/20 z-50 flex flex-col shadow-2xl shadow-purple-500/10 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 z-10"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-purple-500/20">
          <Link
            href="/"
            className="flex items-center justify-center group"
            aria-label="Home"
          >
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Gradient Accent Line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        {/* Navigation Links */}
        <nav className="flex-1 py-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleScroll}
                    aria-label={`Navigate to ${item.label}`}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover Background Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

                    {/* Icon */}
                    <IconComponent className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300 relative z-10" />

                    {/* Label */}
                    <span className="font-medium text-lg relative z-10">
                      {item.label}
                    </span>

                    {/* Active Indicator */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r-full group-hover:h-6 transition-all duration-300" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-24 h-24 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

        {/* Resume Button Section */}
        <div className="p-6 border-t border-purple-500/20">
          <AnimatedResumeButton />
        </div>

        {/* Bottom Gradient Accent */}
        <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />
      </aside>
    </>
  );
}
