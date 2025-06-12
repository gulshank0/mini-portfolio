"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                damping: 12
            }
        }
    };

    const socialLinks = [
        { name: 'Email', icon: <FaEnvelope className="text-xl" />, href: 'mailto:gulshan.tech.dev@gmail.com', value: 'gulshan.tech.dev@gmail.com' },
        { name: 'LinkedIn', icon: <FaLinkedin className="text-xl" />, href: 'https://www.linkedin.com/in/gulshan-kumar-872512270/', value: 'linkedin.com/in/gulshan-kumar-872512270/' },
        { name: 'GitHub', icon: <FaGithub className="text-xl" />, href: 'https://github.com/gulshank0', value: 'github.com/gulshank0' },
        { name: 'Twitter', icon: <FaTwitter className="text-xl" />, href: 'https://x.com/gulshank0', value: '@gulshank0' }
    ];

    return (
        <div className="min-h-screen pt-30 bg-black text-white py-16 px-4 sm:px-6">
            <motion.div 
                className="max-w-5xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                   
                  
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-b from-purple-900/50 to rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Send me a message</h2>
                        
                        {isSubmitted ? (
                            <motion.div 
                                className="bg-blue-500/20 border border-blue-500 text-blue-300 p-4 rounded-lg text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                Thank you for your message! I'll get back to you soon.
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 bg-black border border-purple-950 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-900 text-white resize-none"
                                        placeholder="Your message here..."
                                    />
                                </div>
                                <motion.button 
                                    type="submit"
                                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-950/50 to-purple-800/50 hover:cursor-pointer text-white font-medium rounded-md hover:from-purple-900/50 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                    
                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h2 className="text-2xl font-semibold mb-6">Connect with me</h2>
                        
                        <div className="space-y-6">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 bg-slate-950 rounded-lg hover:bg-gray-900 transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-2xl mr-4">{link.icon}</span>
                                    <div>
                                        <p className="font-medium">{link.name}</p>
                                        <p className="text-sm text-purple-600">{link.value}</p>
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
