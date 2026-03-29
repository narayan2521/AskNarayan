import React from 'react';
import { 
  FiSun, FiMoon, FiLinkedin, FiGithub, 
  FiHome, FiUser, FiBriefcase, FiCpu, 
  FiCode, FiBook, FiShield, FiSend,
  FiMenu, FiX, FiMessageSquare
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ darkMode, setDarkMode, activeSection, handleNavClick, sections, meta, isCollapsed, setIsCollapsed }) => {
  
  // Icon mapping for navigation
  const getIcon = (id) => {
    switch (id) {
      case 'home': return <FiHome size={20} />;
      case 'about': return <FiUser size={20} />;
      case 'experience': return <FiBriefcase size={20} />;
      case 'skills': return <FiCpu size={20} />;
      case 'projects': return <FiCode size={20} />;
      case 'education': return <FiBook size={20} />;
      case 'certifications': return <FiShield size={20} />;
      case 'contact': return <FiSend size={20} />;
      case 'chat': return <FiMessageSquare size={20} />;
      default: return <FiHome size={20} />;
    }
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`fixed top-0 left-0 h-full z-30 transition-all duration-500 overflow-hidden hidden lg:flex ${
        darkMode ? 'bg-[#0a0a0c] border-r border-white/5' : 'bg-[#f4f7f9] border-r border-slate-200'
      }`}
    >
      <div className="flex flex-col h-full py-8">
        
        {/* Toggle & Logo Section */}
        <div className={`px-6 mb-12 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3 overflow-hidden whitespace-nowrap"
            >
              <img 
                src="/ask-narayan-logo.png" 
                alt="Narayan Prasad" 
                className="w-full h-auto max-h-20 object-contain px-2"
              />
            </motion.div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'mb-4' : ''}`}
          >
            {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3 px-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick(section.id)}
              className={`w-full p-4 rounded-2xl transition-all duration-300 flex items-center space-x-4 text-sm font-bold capitalize relative group ${
                activeSection === section.id
                  ? (darkMode ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-white text-blue-600 shadow-xl shadow-blue-500/5 border border-blue-500/10')
                  : (darkMode ? 'text-slate-500 hover:text-slate-100 hover:bg-slate-800/50' : 'text-slate-400 hover:text-slate-900 hover:bg-white/80')
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <div className="relative">
                {getIcon(section.id)}
                {activeSection === section.id && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute -left-[24px] w-1 h-6 bg-blue-500 rounded-r-full"
                  />
                )}
              </div>
              {!isCollapsed && (
                <motion.span
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                >
                  {section.name}
                </motion.span>
              )}
              {isCollapsed && (
                <div className={`absolute left-16 px-3 py-1.5 rounded-lg text-xs bg-slate-900 text-white font-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50 whitespace-nowrap border border-white/10 shadow-2xl`}>
                   {section.name}
                </div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer Settings */}
        <div className={`mt-auto pt-6 border-t border-slate-700/10 dark:border-white/5 space-y-4 px-4`}>
          
          <div className={`flex flex-col space-y-4 ${isCollapsed ? 'items-center' : ''}`}>
             <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full p-4 rounded-2xl flex items-center justify-center transition-all duration-300 font-black tracking-tight border ${
                  darkMode ? 'bg-slate-900/50 text-yellow-500 border-white/5' : 'bg-white text-slate-900 border-slate-200'
                }`}
              >
                {darkMode ? <><FiSun size={20} /> {!isCollapsed && <span className="ml-3">Light Mode</span>}</> : <><FiMoon size={20} /> {!isCollapsed && <span className="ml-3">Dark Mode</span>}</>}
              </button>

              {!isCollapsed && (
                 <div className="flex items-center space-x-4 px-2">
                    <a href={meta.socials.find(s => s.icon === 'linkedin')?.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors opacity-60 hover:opacity-100">
                      <FiLinkedin size={20} />
                    </a>
                    <a href={meta.socials.find(s => s.icon === 'github')?.link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors opacity-60 hover:opacity-100">
                      <FiGithub size={20} />
                    </a>
                 </div>
              )}
          </div>

          {!isCollapsed && (
            <div className="flex items-center space-x-3 p-2 bg-blue-500/5 rounded-2xl border border-blue-500/10">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black">
                 NP
               </div>
               <div className="flex-1 overflow-hidden">
                 <p className="text-xs font-black truncate">{meta.name}</p>
                 <p className="text-[10px] opacity-50 truncate">Software Design Engineer</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
