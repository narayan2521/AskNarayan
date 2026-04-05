// import React from 'react';
// import { motion } from 'framer-motion';
// import { Card, Badge, Button } from '../ui';
// import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiSend } from 'react-icons/fi';

// const Contact = ({ content, darkMode }) => {
//   return (
//     <div className="max-w-6xl mx-auto py-20 px-4">
//       <h2 className="section-title text-center mb-16">{content.title}</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="space-y-12">
//             <div>
//               <h3 className="text-3xl font-black mb-4 tracking-tighter">Let's Connect</h3>
//               <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
//                 Open for collaborations, interesting projects, or just a coffee chat about software engineering and design systems.
//               </p>
//             </div>

//             <div className="grid gap-6">
//               <a href={`mailto:${content.content.email}`} className="group flex items-center gap-6 p-6 rounded-2xl bg-blue-600/5 hover:bg-blue-600 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-blue-600/10">
//                 <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
//                   <FiMail size={24} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-black uppercase tracking-widest opacity-50">Email Me</p>
//                   <p className="text-xl font-bold">{content.content.email}</p>
//                 </div>
//               </a>

//               <div className="flex gap-4">
//                 <a href={content.content.linkedin} className="flex-1 group flex items-center gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-slate-200 dark:border-slate-700">
//                   <FiLinkedin size={24} className="shrink-0" />
//                   <span className="text-lg font-bold">LinkedIn</span>
//                 </a>
//                 <a href={content.content.github} className="flex-1 group flex items-center gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-900 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-slate-200 dark:border-slate-700">
//                   <FiGithub size={24} className="shrink-0" />
//                   <span className="text-lg font-bold">GitHub</span>
//                 </a>
//               </div>

//               <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
//                 <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
//                   <FiMapPin size={24} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-black uppercase tracking-widest opacity-50">Location</p>
//                   <p className="text-xl font-bold">{content.content.location}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <Card darkMode={darkMode} className="p-10 border-0 shadow-2xl">
//             <form className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Name</label>
//                   <input type="text" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold" placeholder="John Doe" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Email</label>
//                   <input type="email" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold" placeholder="john@example.com" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Message</label>
//                 <textarea rows="6" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold resize-none" placeholder="How can I help you?"></textarea>
//               </div>
//               <Button type="submit" className="w-full py-5 text-lg font-black uppercase tracking-tighter">
//                 <span>Send Message</span>
//                 <FiSend size={20} />
//               </Button>
//             </form>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiSend,
  FiMessageCircle,
  FiCpu,
  FiZap,
  FiArrowRight,
  FiCheckCircle,
  FiLoader,
  FiTwitter,
  FiInstagram,
  FiCalendar
} from 'react-icons/fi';
import {
  RiRobot2Line,
  RiSparklingLine,
  RiBrainLine,
  RiMagicLine
} from 'react-icons/ri';

// Glassmorphism Card Component with Magnetic/Spotlight Effect
const GlassCard = ({ children, className = '', delay = 0 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        rounded-3xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)]
        transition-all duration-500
        group
        ${className}
      `}
    >
      {/* Dynamic Spotlight Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-3 h-3 bg-purple-400 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Animated Input Component
const AnimatedInput = ({ label, type = 'text', name, placeholder, value, onChange, delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <motion.label
        animate={{
          y: isFocused || value ? -24 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? '#6366f1' : '#94a3b8'
        }}
        className="absolute left-4 top-4 font-semibold pointer-events-none origin-left transition-colors"
      >
        {label}
      </motion.label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 pt-6 pb-3 
            bg-white/5 backdrop-blur-sm
            border-2 rounded-2xl
            outline-none transition-all duration-300
            text-white font-medium
            placeholder:text-transparent
            ${isFocused
              ? 'border-indigo-500 bg-white/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
              : 'border-white/10 hover:border-white/20'
            }
          `}
          placeholder={placeholder}
        />

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 origin-left"
        />
      </div>
    </motion.div>
  );
};

// Animated Textarea Component
const AnimatedTextarea = ({ label, name, placeholder, value, onChange, delay = 0 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <motion.label
        animate={{
          y: isFocused || value ? -24 : 0,
          scale: isFocused || value ? 0.85 : 1,
          color: isFocused ? '#6366f1' : '#94a3b8'
        }}
        className="absolute left-4 top-4 font-semibold pointer-events-none origin-left transition-colors z-10"
      >
        {label}
      </motion.label>

      <div className="relative">
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 pt-6 pb-3 
            bg-white/5 backdrop-blur-sm
            border-2 rounded-2xl
            outline-none transition-all duration-300
            text-white font-medium resize-none
            placeholder:text-transparent
            ${isFocused
              ? 'border-indigo-500 bg-white/10 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
              : 'border-white/10 hover:border-white/20'
            }
          `}
          placeholder={placeholder}
        />
      </div>
    </motion.div>
  );
};

// AI Typing Effect Component
const AITypingEffect = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
};

// Main Contact Component
const Contact = ({ content, darkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactLinks = [
    {
      icon: FiMail,
      label: 'Email',
      value: content?.content?.email || 'hello@example.com',
      href: `mailto:${content?.content?.email || 'hello@example.com'}`,
      color: 'from-rose-500 to-orange-500',
      delay: 0.1
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'Connect Professionally',
      href: content?.content?.linkedin || '#',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'View My Code',
      href: content?.content?.github || '#',
      color: 'from-slate-700 to-slate-900',
      delay: 0.3
    },
    {
      icon: FiTwitter,
      label: 'Twitter / X',
      value: 'Latest Updates',
      href: '#',
      color: 'from-sky-400 to-blue-500',
      delay: 0.4
    },
    {
      icon: FiInstagram,
      label: 'Instagram',
      value: 'Life & Design',
      href: '#',
      color: 'from-pink-500 via-purple-500 to-orange-500',
      delay: 0.5
    },
    {
      icon: FiCalendar,
      label: 'Schedule call',
      value: 'Book a 1:1 Session',
      href: '#',
      color: 'from-emerald-400 to-teal-500',
      delay: 0.6
    }
  ];

  return (
    <section className="relative min-h-full py-10 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px]"
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Freelance Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative px-6 py-2 bg-slate-900 border border-emerald-500/30 rounded-full flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-black tracking-widest text-emerald-400 uppercase">
                  Ready for Freelance Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* AI Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <RiSparklingLine className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-indigo-300 tracking-wide uppercase">
              AI-Powered Excellence
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <RiSparklingLine className="w-4 h-4 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Title with AI Effect */}
          <h2 className="text-3xl xs:text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
              Let's Build Something
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Intelligent Together
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            <AITypingEffect
              text="Open for AI collaborations, ML projects, or just a conversation about the future of intelligent systems."
              speed={30}
            />
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column - Contact Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-fit">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: link.delay, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group relative block"
              >
                <div className={`
                  relative overflow-hidden
                  p-5 rounded-2xl
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  transition-all duration-500
                  ${hoveredCard === index ? 'shadow-[0_0_40px_rgba(99,102,241,0.3)] border-indigo-500/50' : ''}
                `}>
                  {/* Animated gradient background on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-10`}
                  />

                  <div className="relative flex items-center gap-5">
                    {/* Icon Container */}
                    <motion.div
                      animate={{
                        rotate: hoveredCard === index ? [0, -10, 10, 0] : 0,
                        scale: hoveredCard === index ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`
                        w-14 h-14 rounded-xl flex items-center justify-center
                        bg-gradient-to-br ${link.color}
                        shadow-lg
                      `}
                    >
                      <link.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {link.label}
                      </p>
                      <p className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {link.value}
                      </p>
                    </div>

                    {/* Arrow Animation */}
                    <motion.div
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      className="text-slate-500 group-hover:text-white transition-colors"
                    >
                      <FiArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Progress bar effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column - Contact Form & Info Cards */}
          <div className="lg:col-span-7 space-y-6 flex flex-col">
            <GlassCard delay={0.3} className="p-8 md:p-10 flex-grow">
              {/* Form Header */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                >
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                  <p className="text-sm text-slate-400">I'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedInput
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    delay={0.4}
                  />
                  <AnimatedInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    delay={0.5}
                  />
                </div>

                <AnimatedTextarea
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your AI project..."
                  delay={0.6}
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative w-full py-4 rounded-2xl font-bold text-lg
                    overflow-hidden transition-all duration-500
                    ${isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]'
                    }
                    disabled:opacity-70 disabled:cursor-not-allowed
                  `}
                >
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <><FiLoader className="w-5 h-5 animate-spin" />Processing...</>
                    ) : isSubmitted ? (
                      <><FiCheckCircle className="w-5 h-5" />Message Sent Successfully!</>
                    ) : (
                      <><FiSend className="w-5 h-5" />Send Message</>
                    )}
                  </span>
                </motion.button>

                {/* Privacy Note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-xs text-slate-500 mt-6"
                >
                  Your data is processed securely. No spam, ever. 🤖
                </motion.p>
              </form>
            </GlassCard>

            {/* Bottom Row - Multi-info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Card */}
              <GlassCard delay={0.7} className="p-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10">
                    <FiMapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-lg font-bold text-white">{content?.content?.location || 'India'}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Work Mode Card */}
              <GlassCard delay={0.8} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <RiBrainLine className="w-5 h-5 text-purple-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Work Mode</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis">Available for Remote / Freelance</span>
                </div>
              </GlassCard>

              {/* AI Capabilities (Spans 2 cols on md) */}
              <GlassCard delay={0.9} className="p-6 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <RiBrainLine className="w-6 h-6 text-purple-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Capabilities</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: RiRobot2Line, label: 'LLM' },
                    { icon: FiCpu, label: 'NN' },
                    { icon: FiZap, label: 'Inference' },
                    { icon: RiMagicLine, label: 'Gen AI' }
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Bottom Floating Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {['React', 'TypeScript', 'TensorFlow', 'PyTorch', 'OpenAI', 'Node.js'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;