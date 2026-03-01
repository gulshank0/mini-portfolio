"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    icon: FaEnvelope,
    href: "mailto:gulshan.tech.dev@gmail.com",
    value: "gulshan.tech.dev@gmail.com",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/gulshank0/",
    value: "gulshank0",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/gulshank0",
    value: "gulshank0",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    href: "https://x.com/gulshank0",
    value: "@gulshank0",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xreajzrq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 pb-32 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-2">Contact</p>
        <p className="text-[15px] text-[var(--muted-foreground)] mb-10">
          Feel free to reach out for collaborations or just a friendly hello
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">
            Connect with me
          </h3>
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-200 group"
              whileHover={{ x: 4 }}
            >
              <div className="w-9 h-9 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                <link.icon className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {link.name}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6"
        >
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-5">
            Send me a message
          </h3>

          {isSubmitted ? (
            <motion.div
              className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Thank you! I&apos;ll get back to you soon.
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)] focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3.5 py-2.5 bg-[var(--background)] border border-[var(--border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)] focus:border-transparent transition-all resize-none"
                    placeholder="Hello! I'd like to..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--muted-foreground)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:opacity-60 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
