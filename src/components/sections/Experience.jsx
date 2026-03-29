import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiArrowRight, FiCheckCircle, FiInfo } from 'react-icons/fi';

const ExperienceNode = ({ exp, company, color = "blue", side = "left", link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const themeColors = {
    blue: "text-blue-400 border-blue-500/30 bg-blue-500/5 shadow-blue-500/10 hover:border-blue-500/50",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/5 shadow-purple-500/10 hover:border-purple-500/50",
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5 shadow-emerald-500/10 hover:border-emerald-500/50"
  };

  const dotColors = {
    blue: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]",
    purple: "bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]",
    emerald: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
  };

  return (
    <div className={`relative flex items-center justify-center w-full mb-32 last:mb-0 ${
      side === "right" ? "md:flex-row-reverse" : "md:flex-row"
    } flex-col`}>
      
      {/* Node Content (Pill/Card) */}
      <div className={`w-full md:w-1/2 flex ${side === "right" ? "md:justify-start" : "md:justify-end"}`}>
        <motion.div
           layout
           initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           animate={{
             borderRadius: isHovered ? "24px" : "100px",
           }}
           transition={{
             layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
             borderRadius: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
           }}
           className={`node-pill min-w-[300px] md:max-w-[500px] shadow-2xl z-20 flex-col !items-stretch overflow-hidden ${themeColors[color]} ${
             side === "left" ? "md:mr-16" : "md:ml-16"
           }`}
        >
          {/* Header Area (Always Visible) */}
          <div className="flex items-center gap-4 p-5">
             <div className={`status-dot shrink-0 ${dotColors[color]}`} />
             <div className="flex-1">
                <h4 className="font-black text-base uppercase tracking-wider">{exp.role}</h4>
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-1 gap-2">
                  {link ? (
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] font-black uppercase tracking-tight text-blue-400 hover:text-white transition-colors"
                    >
                      {company}
                    </a>
                  ) : (
                    <p className="text-[11px] opacity-80 font-bold uppercase tracking-tight text-slate-300">{company}</p>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80 bg-white/10 px-3 py-1 rounded-md border border-white/10 w-fit">{exp.duration}</span>
                </div>
             </div>
          </div>

          {/* Details Area (Expands on Hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 pt-4 border-t border-white/5 bg-white/[0.03]">
                   <ul className="space-y-4">
                    {exp.contributions.map((c, i) => (
                      <li key={i} className="text-[13px] text-slate-300 leading-relaxed flex items-start gap-3">
                        <FiCheckCircle className={`mt-1 shrink-0 ${themeColors[color].split(' ')[0]}`} />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                    {exp.skills.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Central Connector Dot (On the Spine) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 z-30 hidden md:block">
         <div className={`absolute inset-1 rounded-full ${dotColors[color]} transition-transform duration-500 group-hover:scale-150`} />
      </div>

      {/* Side Brand Hint */}
      <div className={`hidden md:block w-1/2 px-16 ${side === "right" ? "text-right pr-28" : "text-left pl-28"}`}>
          <div className="opacity-10 group-hover:opacity-40 transition-all duration-500 scale-90 group-hover:scale-100">
             <FiBriefcase className="inline-block mr-3 text-xl" />
             <span className="text-xs font-black uppercase tracking-[0.5em]">{company}</span>
          </div>
      </div>
    </div>
  );
};

const Experience = ({ content, darkMode }) => {
  const colors = ["blue", "purple", "emerald"];

  return (
    <div className="w-full max-w-[1400px] mx-auto py-16 px-8 custom-scrollbar h-full overflow-y-auto overflow-x-hidden">
      
      {/* Header */}
      <div className="mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-500 text-[11px] font-black tracking-[0.4em] uppercase mb-4 block">Professional Timeline</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">Flow</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-500 font-medium opacity-80 leading-relaxed">
            A visual flow of my professional journey, highlighting key milestones, architectural decisions, and high-impact contributions.
          </p>
        </motion.div>
      </div>

      <div className="relative pb-40">
        {/* Central Vertical Spine (Desktop only) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/20 to-transparent hidden md:block" />

        <div className="relative space-y-40">
          {content.content.map((company, cIdx) => (
            <div key={cIdx}>
                {company.roles.map((role, rIdx) => {
                  const globalIdx = cIdx + rIdx;
                  return (
                    <ExperienceNode 
                      key={rIdx} 
                      exp={role} 
                      company={company.company} 
                      link={company.link}
                      color={colors[cIdx % colors.length]}
                      side={globalIdx % 2 === 0 ? "left" : "right"}
                    />
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
