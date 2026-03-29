import React from 'react';
import { motion } from 'framer-motion';
import { FiGitCommit, FiGitBranch } from 'react-icons/fi';
import { Badge } from '../ui';

const Experience = ({ content, darkMode }) => {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 md:px-8">
      <div className="flex items-center gap-4 mb-16 justify-center">
        <FiGitBranch className="text-blue-500 text-3xl" />
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">{content.title}</h2>
      </div>
      
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-12 space-y-16">
        
        {content.content.map((company, companyIndex) => (
          <React.Fragment key={companyIndex}>
            {company.roles.map((exp, roleIndex) => (
              <motion.div
                key={`${companyIndex}-${roleIndex}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: roleIndex * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Git Commit Node */}
                <div className="absolute -left-[17px] top-1">
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 border-4 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 transition-transform duration-300 hover:scale-125">
                    <FiGitCommit className="text-blue-500 text-[10px]" />
                  </div>
                </div>

                {/* Commit Message / Card */}
                <div className={`p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 shadow-black' : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-blue-500/10'
                }`}>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 leading-tight">
                        {exp.role}
                      </h3>
                      <div className="font-mono text-sm text-slate-500 mt-2 font-bold flex items-center gap-2">
                        <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs select-none">HEAD</span>
                        {company.company}
                      </div>
                    </div>
                    
                    <div className="font-mono text-xs md:text-sm font-semibold opacity-60 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-nowrap">
                      {exp.duration}
                    </div>
                  </div>

                  {/* Commit Details */}
                  <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700/50 space-y-3 mb-8">
                    {exp.contributions.map((item, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex items-start">
                        <span className="text-blue-500 mr-2 mt-1 font-bold select-none">+</span>
                        {item}
                      </p>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/50">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-transparent hover:bg-blue-500/10 transition-colors border-slate-300 dark:border-slate-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Experience;
