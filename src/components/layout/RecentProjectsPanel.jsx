import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLayout, FiChevronRight, FiCheckCircle } from 'react-icons/fi';

const RecentProjectsPanel = ({ isOpen, projects, darkMode, handleNavClick }) => {
  // Take top 3 projects from the list
  const recentProjects = projects.slice(0, 3);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed top-0 right-0 h-full w-[300px] z-20 transition-all duration-500 overflow-y-auto hidden lg:block ${
            darkMode ? 'bg-[#0a0a0c] border-l border-white/5' : 'bg-[#f4f7f9] border-l border-slate-200'
          }`}
        >
          <div className="p-8 pt-12 flex flex-col h-full space-y-12">
            
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-black tracking-tight opacity-90 uppercase text-[10px] tracking-[0.2em] mb-4">
                Recent Projects ({projects.length})
              </h3>
            </div>

            {/* List */}
            <div className="space-y-4">
              {recentProjects.map((project, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  onClick={() => handleNavClick('projects')}
                  className={`group p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    darkMode ? 'bg-slate-900/50 border-white/5 hover:border-blue-500/50 hover:bg-slate-800' : 'bg-white border-slate-200 hover:border-blue-500/50 hover:shadow-xl shadow-slate-200/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <FiLayout size={18} />
                    </div>
                    <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0" />
                  </div>
                  
                  <h4 className="font-bold text-sm mb-2">{project.title}</h4>
                  <p className="text-[10px] opacity-50 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}

              <button 
                onClick={() => handleNavClick('projects')}
                className={`w-full p-4 rounded-2xl border-2 border-dashed font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  darkMode ? 'border-white/5 hover:border-blue-500/50 hover:text-blue-400' : 'border-slate-200 hover:border-blue-500/50 hover:text-blue-600'
                }`}
              >
                View All Projects
              </button>
            </div>

            {/* Bottom Info Section (Mock) */}
            <div className="mt-auto p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/10">
              <div className="flex flex-col items-center text-center space-y-3">
                 <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white p-2">
                    <FiCheckCircle size={24} />
                 </div>
                 <p className="text-xs font-bold leading-relaxed">
                   Available for New Challenges & Collaborations
                 </p>
                 <button 
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-2 bg-blue-500 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                 >
                   Send Message
                 </button>
              </div>
            </div>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default RecentProjectsPanel;
