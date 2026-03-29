import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { Badge } from '../ui';

const Projects = ({ content, darkMode }) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <div className="flex items-center gap-4 mb-16 justify-center">
        <FiCode className="text-blue-500 text-4xl" />
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">{content.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {content.content.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}
          >
            {/* Editor Top Bar Mockup */}
            <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#ff5f56] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#ffbd2e] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#27c93f] transition-colors" />
              </div>
              <div className="font-mono text-xs font-semibold opacity-50 flex items-center gap-2">
                <FiGithub /> src/{project.title.toLowerCase().replace(/\s/g, '_')}.js
              </div>
            </div>

            <div className="relative overflow-hidden aspect-video border-b border-slate-200 dark:border-slate-800">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-end justify-center pb-8 gap-4">
                <a href={project.github} className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 border border-white/20">
                  <FiGithub size={20} />
                </a>
                <a href={project.link} className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-150 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 border border-white/20">
                  <FiExternalLink size={20} />
                </a>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                {project.description}
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800/50 flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <Badge key={i} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover:border-blue-500/50 transition-colors">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
