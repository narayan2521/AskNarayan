import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, FiUser, FiBriefcase, FiCpu, 
  FiCode, FiBook, FiShield, FiSend,
  FiMessageSquare
} from 'react-icons/fi';

const MobileNav = ({ activeSection, handleNavClick, sections, darkMode }) => {
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
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-4 right-4 z-50 lg:hidden"
    >
      <div className={`
        grid grid-cols-4 gap-1 p-3
        backdrop-blur-2xl rounded-[32px] border
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${darkMode 
          ? 'bg-slate-900/40 border-white/10 shadow-blue-900/10' 
          : 'bg-white/40 border-slate-200/50 shadow-slate-200/50'
        }
      `}>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleNavClick(section.id)}
            className={`
              relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300
              ${activeSection === section.id 
                ? 'text-blue-500 bg-blue-500/10 scale-110 shadow-inner' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }
            `}
          >
            <div className="relative">
              {getIcon(section.id)}
              {activeSection === section.id && (
                <motion.div
                  layoutId="active-nav-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNav;
