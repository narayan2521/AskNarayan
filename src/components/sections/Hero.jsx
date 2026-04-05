import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiCode, FiBriefcase, FiCpu, 
  FiPlus, FiImage, FiEdit3, FiTerminal,
  FiZap, FiCompass, FiLayers, FiMessageSquare
} from 'react-icons/fi';

const SuggestionTile = ({ icon: Icon, title, subtitle, onClick, color }) => (
  <motion.button
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative flex items-center justify-between p-5 md:p-7 rounded-2xl md:rounded-[2rem] border transition-all duration-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 text-left w-full h-full overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    
    <div className="flex flex-col h-full justify-between gap-4 z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.replace('bg-', 'bg-').replace('/10', '/20')} text-slate-900 dark:text-white mb-2 shadow-lg shadow-black/5`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="text-lg md:text-xl font-black mb-1 tracking-tight">{title}</h4>
        <p className="text-[10px] md:text-sm opacity-50 font-medium leading-relaxed">{subtitle}</p>
      </div>
    </div>
    
    <div className="absolute top-6 right-6 p-2 rounded-full border border-slate-100 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      <FiPlus className="text-blue-500" />
    </div>
  </motion.button>
);

const Hero = ({ content, handleNavClick, darkMode }) => {
    const suggestions = [
    {
      id: 'chat',
      title: 'AI Assistant',
      subtitle: 'Interactive chat to learn more.',
      icon: FiMessageSquare,
      color: 'bg-indigo-500/10'
    },
    {
      id: 'projects',
      title: 'View Projects',
      subtitle: 'Showcase of my best work.',
      icon: FiCode,
      color: 'bg-blue-500/10'
    },
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'Who is Narayan? Read my bio.',
      icon: FiUser,
      color: 'bg-emerald-500/10'
    },
    {
      id: 'contact',
      title: 'Get in Touch',
      subtitle: 'Let\'s build something together.',
      icon: FiEdit3,
      color: 'bg-rose-500/10'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4">
      
      {/* Central Hero Section */}
      <div className="max-w-4xl w-full text-center space-y-12 mb-16">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative inline-block mb-6 md:mb-10"
        >
           <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full opacity-60"></div>
           <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-5 md:p-6 shadow-2xl shadow-blue-500/30">
             <FiZap className="w-full h-full text-white" />
           </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          <h1 className="text-3xl xs:text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-blue-100 dark:to-slate-400">
            Welcome to Script
          </h1>
          <p className="text-base md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            I am Narayan. A Software Design Engineer. How can I assist you today? 
            Not sure where to start?
          </p>
        </motion.div>
      </div>

      {/* Suggestion Grid */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8"
      >
        {suggestions.map((item, idx) => (
          <SuggestionTile
            key={item.id}
            {...item}
            onClick={() => handleNavClick(item.id)}
          />
        ))}
      </motion.div>

      {/* Footer Info (Minor) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
         <div className="flex items-center justify-center space-x-8 text-xs font-black tracking-widest uppercase opacity-30 select-none">
            <div className="flex items-center space-x-2">
               <FiCompass size={14} /> <span>Portfolio AI v1.3</span>
            </div>
            <div className="flex items-center space-x-2">
               <FiLayers size={14} /> <span>State-of-the-art UI</span>
            </div>
         </div>
      </motion.div>

    </div>
  );
};

export default Hero;
