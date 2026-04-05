import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaGithub, FaLinkedin, FaDownload, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiVite, SiFigma, SiPostman, SiRedux, SiSpringboot } from 'react-icons/si';

const FloatIcon = ({ icon: Icon, color, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      delay, 
      duration: 3 + Math.random() * 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`absolute z-20 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${color}`}
    style={{ left: x, top: y }}
  >
    <Icon size={24} />
  </motion.div>
);

const Squiggle = ({ color, top, left, delay }) => (
  <motion.svg
    width="100" height="40" viewBox="0 0 100 40"
    className="absolute pointer-events-none opacity-40 md:opacity-100"
    style={{ top, left }}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 2, delay, ease: "easeInOut" }}
  >
    <motion.path
      d="M0,20 Q25,0 50,20 T100,20"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      animate={{ 
        d: [
          "M0,20 Q25,0 50,20 T100,20",
          "M0,20 Q25,40 50,20 T100,20",
          "M0,20 Q25,0 50,20 T100,20"
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

const ConnectionLine = ({ from, to }) => {
  const d = `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`;
  
  return (
    <g>
      <path 
        d={d} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="4 8" 
        className="text-slate-300/20 dark:text-blue-500/10" 
      />
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="4 24"
        strokeLinecap="round"
        className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </g>
  );
};

const TechNode = ({ x, y, icon: Icon, label, color, isCenter = false }) => (
  <motion.div
    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 group"
    style={{ left: x, top: y }}
    whileHover={{ scale: 1.15 }}
  >
    <div className={`
      relative p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500
      ${isCenter ? 'w-24 h-24 ring-4 ring-blue-500/20' : 'w-16 h-16'}
      ${isCenter ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 dark:bg-black/20 dark:border-white/5'}
      group-hover:border-blue-500/50 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
    `}>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />
      
      {isCenter ? (
        <img 
          src="/developer_portrait_avatar_1774789580099.png" 
          alt="Narayan" 
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 ${color || 'text-slate-100'}`}>
          <Icon />
        </div>
      )}
      
      <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
    
    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90 drop-shadow-lg whitespace-nowrap bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-xl opacity-80 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </motion.div>
);

const TechEcosystem = () => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);
  const centerX = 500;
  const centerY = 350;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // ONLY zoom if Ctrl key is held, otherwise let the page scroll normally
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY;
        setZoom((prevZoom) => {
          const newZoom = delta < 0 ? Math.min(prevZoom + 0.1, 2.5) : Math.max(prevZoom - 0.1, 0.4);
          return newZoom;
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const categories = [
    { id: 'dev', label: 'Development', x: centerX - 250, y: centerY - 120, icon: FaReact, color: 'text-blue-400' },
    { id: 'tools', label: 'Tools', x: centerX + 250, y: centerY - 120, icon: SiFigma, color: 'text-purple-400' },
    { id: 'intern', label: 'Backend', x: centerX, y: centerY + 200, icon: FaJava, color: 'text-orange-400' },
  ];

  const subNodes = [
    { label: 'React', parent: 'dev', x: centerX - 380, y: centerY - 50, icon: FaReact, color: 'text-blue-400' },
    { label: 'JS', parent: 'dev', x: centerX - 380, y: centerY - 190, icon: FaJs, color: 'text-yellow-400' },
    { label: 'TS', parent: 'dev', x: centerX - 250, y: centerY - 250, icon: SiTypescript, color: 'text-blue-600' },
    { label: 'Figma', parent: 'tools', x: centerX + 380, y: centerY - 50, icon: SiFigma, color: 'text-pink-400' },
    { label: 'Git', parent: 'tools', x: centerX + 380, y: centerY - 190, icon: FaGithub, color: 'text-slate-400' },
    { label: 'Tailwind', parent: 'tools', x: centerX + 250, y: centerY - 250, icon: SiTailwindcss, color: 'text-cyan-400' },
    { label: 'Java', parent: 'intern', x: centerX - 120, y: centerY + 280, icon: FaJava, color: 'text-red-500' },
    { label: 'Spring', parent: 'intern', x: centerX + 120, y: centerY + 280, icon: SiSpringboot, color: 'text-green-500' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[700px] overflow-hidden bg-slate-950 rounded-3xl md:rounded-[3rem] border border-blue-500/10 cursor-grab active:cursor-grabbing shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 opacity-100" />
        <svg width="100%" height="100%" className="opacity-10">
          <pattern id="mesh-grid-v2" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
            <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-blue-500/30" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mesh-grid-v2)" />
        </svg>
      </div>

      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30 p-3 md:p-4 bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] uppercase tracking-widest font-black text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]">
        Drag • Ctrl + Wheel Zoom
      </div>

      <motion.div 
        className="w-full h-full relative"
        drag
        dragConstraints={{ left: -600, right: 600, top: -500, bottom: 500 }}
        style={{ scale: zoom }}
      >
        <svg width="1000" height="700" className="absolute inset-0 z-0">
          {categories.map((cat) => (
            <ConnectionLine key={`line-hub-${cat.id}`} from={{ x: centerX, y: centerY }} to={{ x: cat.x, y: cat.y }} />
          ))}
          {subNodes.map((sub) => {
            const parent = categories.find(c => c.id === sub.parent);
            return <ConnectionLine key={`line-sub-${sub.label}`} from={{ x: parent.x, y: parent.y }} to={{ x: sub.x, y: sub.y }} />;
          })}
        </svg>

        <TechNode x={centerX} y={centerY} isCenter label="Narayan" />
        {categories.map((cat) => (
          <TechNode key={cat.id} x={cat.x} y={cat.y} icon={cat.icon} label={cat.label} color={cat.color} />
        ))}
        {subNodes.map((sub) => (
          <TechNode key={sub.label} x={sub.x} y={sub.y} icon={sub.icon} label={sub.label} color={sub.color} />
        ))}
      </motion.div>
    </div>
  );
};

const About = ({ content }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const techStack = [
    { name: 'React', Icon: FaReact, color: 'text-blue-400' },
    { name: 'JavaScript', Icon: FaJs, color: 'text-yellow-400' },
    { name: 'TypeScript', Icon: SiTypescript, color: 'text-blue-600' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'Vite', Icon: SiVite, color: 'text-purple-400' },
    { name: 'Figma', Icon: SiFigma, color: 'text-pink-500' },
    { name: 'Git', Icon: FaGithub, color: 'text-slate-400' }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 custom-scrollbar h-full overflow-y-auto overflow-x-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24"
      >
        {/* Left Side: Content */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="flex items-center gap-2 text-xl font-medium text-blue-500">
              <span className="text-2xl animate-bounce">👋</span> Hey There!
            </h4>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight px-1">
              My Name Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 decoration-4 md:decoration-8 underline-offset-4 underline decoration-blue-500/20">Narayan</span>, 
              <br className="hidden md:block" />
              UI Team Lead & Engineer.
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-400 dark:text-slate-300 leading-relaxed max-w-2xl px-1">
            {content.content.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#" 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20"
            >
              <FaDownload size={18} /> Get CV
            </a>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all hover:-translate-y-1">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/narayan-prasad-mohanty" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all hover:-translate-y-1">
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Hero */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full aspect-square rounded-3xl md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/5 backdrop-blur-sm shadow-2xl"
          >
            {/* Using the generated avatar image */}
            <img 
              src="/developer_portrait_avatar_1774789580099.png" 
              alt="Narayan" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
            />
            {/* Background shape */}
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
          </motion.div>

          {/* Floating Icons */}
          <FloatIcon icon={FaReact} color="text-blue-400" delay={0.5} x="-10%" y="10%" />
          <FloatIcon icon={FaJs} color="text-yellow-400" delay={0.8} x="90%" y="30%" />
          <FloatIcon icon={SiTailwindcss} color="text-cyan-400" delay={1.1} x="80%" y="-10%" />
          <FloatIcon icon={SiTypescript} color="text-blue-600" delay={1.4} x="0%" y="80%" />
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* TechEcosystem Section */}
      <div className="relative pt-24 pb-12">
        <Squiggle color="#3b82f6" top="0" left="10%" delay={1} />
        <Squiggle color="#a855f7" top="20%" left="80%" delay={1.5} />
        <Squiggle color="#ec4899" top="-30%" left="50%" delay={2} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter px-4">
            Tech Ecosystem & Mastering Tools
          </h2>
          <p className="text-slate-400 uppercase tracking-[0.3em] font-semibold text-sm">
            Everything connects to build the future
          </p>
        </motion.div>

        <TechEcosystem />
      </div>
    </div>
  );
};

export default About;
