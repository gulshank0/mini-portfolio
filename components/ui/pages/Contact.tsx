"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Contact() {
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  const socialLinks = [
    {
      name: "Email",
      icon: <FaEnvelope className="text-lg sm:text-xl" />,
      href: "mailto:gulshan.tech.dev@gmail.com",
      value: "gulshan.tech.dev@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-lg sm:text-xl" />,
      href: "https://www.linkedin.com/in/gulshan-kumar-872512270/",
      value: "linkedin.com/in/gulshan-kumar-872512270/",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-lg sm:text-xl" />,
      href: "https://github.com/gulshank0",
      value: "github.com/gulshank0",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-lg sm:text-xl" />,
      href: "https://x.com/gulshank0",
      value: "@gulshank0",
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 lg:ml-64 bg-black text-white py-12 sm:py-16 px-4 sm:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-b from-purple-900/50 to rounded-xl p-4 sm:p-6 shadow-lg order-2 lg:order-1"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Send me a message
            </h2>

            {isSubmitted ? (
              <motion.div
                className="bg-blue-500/20 border border-blue-500 text-blue-300 p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Thank you for your message! I will get back to you soon.
              </motion.div>
            ) : (
              <>
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500 text-red-300 p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {error}
                </motion.div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
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
                    className="w-full px-3 sm:px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
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
                    className="w-full px-3 sm:px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
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
                    className="w-full px-3 sm:px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white resize-none text-sm sm:text-base"
                    placeholder="Your message here..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-950/50 to-purple-800/50 hover:cursor-pointer text-white font-medium rounded-md hover:from-purple-900/50 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
              </>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Connect with me
            </h2>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-slate-950 rounded-lg hover:bg-gray-900 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xl sm:text-2xl mr-3 sm:mr-4">
                    {link.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base">
                      {link.name}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-600 truncate">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
