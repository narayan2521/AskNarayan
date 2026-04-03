// import React from 'react';
// import { motion } from 'framer-motion';
// import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
// import { Badge } from '../ui';

// const Projects = ({ content, darkMode }) => {
//   return (
//     <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
//       <div className="flex items-center gap-4 mb-16 justify-center">
//         <FiCode className="text-blue-500 text-4xl" />
//         <h2 className="text-4xl md:text-5xl font-black tracking-tight">{content.title}</h2>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {content.content.map((project, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: "-50px" }}
//             transition={{ duration: 0.5, delay: idx * 0.1 }}
//             className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] ${
//               darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
//             }`}
//           >
//             {/* Editor Top Bar Mockup */}
//             <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
//               <div className="flex gap-2">
//                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#ff5f56] transition-colors" />
//                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#ffbd2e] transition-colors" />
//                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#27c93f] transition-colors" />
//               </div>
//               <div className="font-mono text-xs font-semibold opacity-50 flex items-center gap-2">
//                 <FiGithub /> src/{project.title.toLowerCase().replace(/\s/g, '_')}.js
//               </div>
//             </div>

//             <div className="relative overflow-hidden aspect-video border-b border-slate-200 dark:border-slate-800">
//               <img 
//                 src={project.image} 
//                 alt={project.title} 
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-end justify-center pb-8 gap-4">
//                 <a href={project.github} className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 border border-white/20">
//                   <FiGithub size={20} />
//                 </a>
//                 <a href={project.link} className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-150 p-3 rounded-xl bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 border border-white/20">
//                   <FiExternalLink size={20} />
//                 </a>
//               </div>
//             </div>
            
//             <div className="p-8">
//               <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-blue-500 transition-colors">
//                 {project.title}
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
//                 {project.description}
//               </p>
              
//               <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800/50 flex flex-wrap gap-2">
//                 {project.tech.map((tech, i) => (
//                   <Badge key={i} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 group-hover:border-blue-500/50 transition-colors">
//                     {tech}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;



 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiGithub, 
  FiExternalLink, 
  FiArrowUpRight,
  FiFolder,
  FiClock,
  FiLayers,
  FiZap
} from 'react-icons/fi';

const Projects = ({ content, darkMode }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const projectsData = content.content.map((project, idx) => ({
    ...project,
    id: idx,
    year: 2024 - idx,
    category: idx === 0 ? 'Dashboard' : idx === 1 ? 'API' : 'Web App',
    color: idx === 0 ? 'blue' : idx === 1 ? 'purple' : 'emerald',
    stats: {
      uptime: '99.9%',
      users: `${(idx + 1) * 2.5}k`,
      latency: `${20 + idx * 5}ms`
    }
  }));

  // Set first project as default, then follow hover
  useEffect(() => {
    if (hoveredId !== null) {
      const project = projectsData.find(p => p.id === hoveredId);
      setActiveProject(project);
    } else {
      setActiveProject(projectsData[0]);
    }
  }, [hoveredId]);

  // Initialize with first project
  useEffect(() => {
    setActiveProject(projectsData[0]);
  }, []);

  return (
    <div className={`w-full py-24 px-6 ${darkMode ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Minimal Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className={`flex items-center gap-3 mb-4 text-sm font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <FiFolder size={16} />
            <span className="uppercase tracking-widest">Selected Work</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className={`text-4xl font-semibold tracking-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Projects
            </h2>
            <span className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Hover to explore
            </span>
          </div>
        </motion.div>

        {/* Two Column Layout: List | Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
          
          {/* Left: Project List */}
          <div className="space-y-1">
            {projectsData.map((project, idx) => {
              const isHovered = hoveredId === project.id;
              const isActive = activeProject?.id === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative cursor-pointer rounded-xl transition-all duration-300 ${
                    isActive 
                      ? darkMode 
                        ? 'bg-slate-900' 
                        : 'bg-white'
                      : 'bg-transparent hover:bg-slate-900/30'
                  }`}
                >
                  {/* Active indicator line */}
                  <motion.div 
                    layoutId="activeLine"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    } ${project.color === 'blue' ? 'bg-blue-500' : project.color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'}`}
                  />

                  <div className="relative px-6 py-6 flex items-center justify-between gap-6">
                    {/* Left: Number & Info */}
                    <div className="flex items-center gap-5 flex-1">
                      <span className={`text-sm font-mono w-6 transition-colors ${
                        isActive 
                          ? darkMode ? 'text-slate-300' : 'text-slate-900'
                          : darkMode ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      
                      <div>
                        <h3 className={`text-lg font-medium mb-0.5 transition-colors ${
                          isActive 
                            ? darkMode ? 'text-slate-100' : 'text-slate-900'
                            : darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs line-clamp-1 transition-colors ${
                          isActive 
                            ? darkMode ? 'text-slate-400' : 'text-slate-500'
                            : darkMode ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Meta & Arrow */}
                    <div className="flex items-center gap-4">
                      <span className={`hidden sm:block text-xs px-2.5 py-1 rounded-md border ${
                        isActive
                          ? darkMode 
                            ? 'border-slate-700 text-slate-300' 
                            : 'border-slate-200 text-slate-600'
                          : darkMode 
                            ? 'border-slate-800 text-slate-600' 
                            : 'border-slate-200 text-slate-400'
                      }`}>
                        {project.category}
                      </span>
                      
                      <motion.div 
                        animate={{ 
                          x: isHovered ? 4 : 0,
                          opacity: isActive ? 1 : 0.2
                        }}
                        transition={{ duration: 0.2 }}
                        className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}
                      >
                        <FiArrowUpRight size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Subtle border */}
                  <div className={`absolute inset-x-0 bottom-0 h-px ${
                    isActive 
                      ? darkMode ? 'bg-slate-800' : 'bg-slate-200'
                      : darkMode ? 'bg-slate-800/50' : 'bg-slate-200/50'
                  }`} />
                </motion.div>
              );
            })}

            {/* GitHub Link */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-3 px-6 py-4 mt-4 text-sm font-medium transition-colors ${
                darkMode 
                  ? 'text-slate-500 hover:text-slate-300' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FiGithub size={16} />
              View all on GitHub
              <FiArrowUpRight size={14} />
            </motion.a>
          </div>

          {/* Right: Live Preview Panel */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className={`sticky top-8 rounded-2xl overflow-hidden border ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-800' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {/* Preview Header */}
                  <div className={`flex items-center justify-between px-5 py-4 border-b ${
                    darkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activeProject.color === 'blue' ? 'bg-blue-500' : 
                        activeProject.color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'
                      }`} />
                      <span className={`text-xs font-mono uppercase tracking-wider ${
                        darkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        Preview
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
                    </div>
                  </div>

                  {/* Preview Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img 
                      key={activeProject.image}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={activeProject.image} 
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      darkMode 
                        ? 'from-slate-900 via-transparent' 
                        : 'from-white via-transparent'
                    } to-transparent opacity-60`} />
                  </div>

                  {/* Preview Content */}
                  <div className="p-6 space-y-5">
                    {/* Title & Year */}
                    <div>
                      <div className={`flex items-center gap-2 mb-2 text-xs font-medium ${
                        darkMode ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        <FiClock size={12} />
                        <span>{activeProject.year}</span>
                        <span>•</span>
                        <span>{activeProject.category}</span>
                      </div>
                      <h3 className={`text-2xl font-semibold mb-2 ${
                        darkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {activeProject.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {activeProject.description}
                      </p>
                    </div>

                    {/* Live Stats */}
                    <div className={`grid grid-cols-3 gap-3 p-4 rounded-xl ${
                      darkMode ? 'bg-slate-950' : 'bg-slate-50'
                    }`}>
                      {Object.entries(activeProject.stats).map(([key, value], i) => (
                        <div key={key} className="text-center">
                          <div className={`text-lg font-semibold mb-0.5 ${
                            darkMode ? 'text-slate-200' : 'text-slate-900'
                          }`}>
                            {value}
                          </div>
                          <div className={`text-[10px] uppercase tracking-wider ${
                            darkMode ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech?.map((tech) => (
                        <span 
                          key={tech}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                            darkMode 
                              ? 'bg-slate-800 text-slate-400' 
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <motion.a
                        href={activeProject.link}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          darkMode 
                            ? 'bg-slate-100 text-slate-900 hover:bg-white' 
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        <FiExternalLink size={14} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={activeProject.github}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          darkMode 
                            ? 'border-slate-800 text-slate-300 hover:border-slate-700' 
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <FiGithub size={14} />
                        Source
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State / Hint */}
            {!activeProject && (
              <div className={`h-full flex items-center justify-center rounded-2xl border border-dashed ${
                darkMode ? 'border-slate-800 text-slate-600' : 'border-slate-300 text-slate-400'
              }`}>
                <div className="text-center">
                  <FiLayers size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Hover a project to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;