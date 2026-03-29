import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { FiArrowRight, FiCpu, FiNavigation } from 'react-icons/fi';

const SkillIcon = ({ iconName, colorClass = "", className = "" }) => {
  const Icon = FaIcons[iconName] || SiIcons[iconName];
  if (!Icon) return <span className={className}>{'</>'}</span>;
  return <Icon className={`${className} ${colorClass}`} />;
};

const OrbitSkill = ({ skill, index, total, radius, onClick }) => {
  const angle = (index * (360 / total));
  
  return (
    <motion.div
      layout
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group pointer-events-auto"
      initial={false}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * radius,
        y: Math.sin((angle * Math.PI) / 180) * radius,
      }}
      whileHover={{ scale: 1.2, zIndex: 50 }}
      onClick={() => onClick(skill)}
    >
      <div className="relative p-3 rounded-xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl group-hover:border-blue-500/50 transition-colors duration-500">
         <SkillIcon iconName={skill.icon} colorClass={skill.color} className="text-2xl" />
         
         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest whitespace-nowrap z-50">
            {skill.name}
         </div>
      </div>
    </motion.div>
  );
};

const Skills = ({ content, darkMode, onNavigate }) => {
  const allSkills = [...content.content.Frontend, ...content.content.Tools];
  const [activeSkill, setActiveSkill] = useState(allSkills[0]);
  const [orbitSkills, setOrbitSkills] = useState(allSkills.slice(1));
  const [rotationActive, setRotationActive] = useState(true);
  const [radius, setRadius] = useState(280);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setRadius(100);
        } else if (window.innerWidth < 1024) {
            setRadius(180);
        } else if (window.innerWidth < 1536) {
            setRadius(280);
        } else {
            setRadius(320);
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSkillClick = (clickedSkill) => {
    setOrbitSkills(prev => {
        const newOrbit = [...prev].filter(s => s.name !== clickedSkill.name);
        return [...newOrbit, activeSkill];
    });
    setActiveSkill(clickedSkill);
  };

  // Split skills into two orbits - Force 7 on inner for density
  const innerOrbitSkills = orbitSkills.slice(0, 7);
  const outerOrbitSkills = orbitSkills.slice(7);

  return (
    <div className="w-full max-w-screen-2xl mx-auto py-12 lg:py-24 px-8 lg:px-16 h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
        
        {/* Left Panel: Content (5/12 cols) */}
        <div className="lg:col-span-5 space-y-8 lg:space-y-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 text-[10px] lg:text-[11px] font-black tracking-[0.4em] uppercase mb-4 block underline decoration-2 underline-offset-8">Tech Ecosystem</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 lg:mb-10 leading-[0.85] py-2">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">Skills.</span>
            </h2>
            
            <AnimatePresence mode="wait">
                <motion.div
                   key={activeSkill.name}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="p-8 lg:p-10 rounded-[32px] bg-slate-900/40 border border-white/10 backdrop-blur-3xl relative group mb-10 shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[100px]" />
                    <div className="flex flex-col gap-8 relative z-10">
                        <div className="flex items-center gap-8 border-b border-white/5 pb-8">
                            <div className="p-4 lg:p-5 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                <SkillIcon iconName={activeSkill.icon} colorClass={activeSkill.color} className="text-5xl lg:text-7xl" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white mb-2 leading-none">{activeSkill.name}</h3>
                                <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                                    <FiCpu className="animate-pulse" /> Core Technology
                                </div>
                            </div>
                        </div>
                        <p className="text-sm lg:text-lg text-slate-400 font-medium leading-[1.6] text-left">
                            {activeSkill.description || "Technical strategy and implementation expert specializing in this domain."}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-8">
                <button 
                  onClick={() => onNavigate?.('contact')}
                  className="px-10 lg:px-12 py-5 lg:py-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs lg:text-sm font-black uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1 flex items-center gap-4 cursor-pointer"
                >
                   Contact Me <FiArrowRight />
                </button>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Dual Orbital Visual (7/12 cols) */}
        <div className="lg:col-span-7 relative order-1 lg:order-2 flex justify-center items-center h-[500px] md:h-[700px] lg:h-[900px] pointer-events-auto">
            {/* Background Decorative Rings */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
                <div className="w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] rounded-full border border-dashed border-white/20 animate-[spin_80s_linear_infinite]" />
                <div className="absolute w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] rounded-full border border-white/5 animate-[spin_150s_linear_infinite_reverse]" />
            </div>

            {/* Glowing Backdrop for Center */}
            <div className="absolute w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* OUTER ORBIT (Clockwise) */}
            <motion.div
               animate={{ rotate: rotationActive ? 360 : 0 }}
               transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
               onMouseEnter={() => setRotationActive(false)}
               onMouseLeave={() => setRotationActive(true)}
               className="absolute w-full h-full flex justify-center items-center pointer-events-none"
            >
                {outerOrbitSkills.map((skill, i) => (
                    <OrbitSkill 
                       key={skill.name} 
                       skill={skill} 
                       index={i} 
                       total={outerOrbitSkills.length} 
                       radius={radius} 
                       onClick={handleSkillClick}
                    />
                ))}
            </motion.div>

            {/* INNER ORBIT (Anti-Clockwise) */}
            <motion.div
               animate={{ rotate: rotationActive ? -360 : 0 }}
               transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
               onMouseEnter={() => setRotationActive(false)}
               onMouseLeave={() => setRotationActive(true)}
               className="absolute w-full h-full flex justify-center items-center pointer-events-none"
            >
                {innerOrbitSkills.map((skill, i) => (
                    <OrbitSkill 
                       key={skill.name} 
                       skill={skill} 
                       index={i} 
                       total={innerOrbitSkills.length} 
                       radius={radius * 0.58} 
                       onClick={handleSkillClick}
                    />
                ))}
            </motion.div>

            {/* Central Hero Icon */}
            <motion.div 
               layoutId="hero-icon"
               className="absolute z-30 p-5 lg:p-8 rounded-[32px] lg:rounded-[48px] bg-slate-950 border-2 border-white/20 shadow-[0_0_120px_rgba(37,99,235,0.2)] backdrop-blur-3xl group pointer-events-auto"
            >
                <SkillIcon iconName={activeSkill.icon} colorClass={activeSkill.color} className="text-6xl lg:text-8xl transition-all duration-500 group-hover:scale-105" />
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Skills;
