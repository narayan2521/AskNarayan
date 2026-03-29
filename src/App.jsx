import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Layout & Sections
import Sidebar from './components/layout/Sidebar';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Chat from './components/sections/Chat';

// New Component
import RecentProjectsPanel from './components/layout/RecentProjectsPanel';

// Data
import portfolioData from './data/Profile.json';

function App() {
  const [darkMode, setDarkMode] = useState(portfolioData.ui.darkMode);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', text: portfolioData.sections.chat.content.welcomeMessage, isNew: true }
  ]);
  
  const sections = Object.keys(portfolioData.sections).map((key) => ({
    id: key,
    name: portfolioData.sections[key].title,
  }));

  const [[pageIndex, direction], setPage] = useState([0, 0]);
  const activeSection = sections[pageIndex]?.id || 'home';

  // Handle Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavClick = (sectionId) => {
    const newIndex = sections.findIndex((s) => s.id === sectionId);
    if (newIndex === pageIndex) return;
    const newDirection = newIndex > pageIndex ? 1 : -1;
    setPage([newIndex, newDirection]);
  };

  const renderSection = () => {
    const sectionData = portfolioData.sections[activeSection] || Object.values(portfolioData.sections)[0];
    switch (activeSection) {
      case 'about': return <About content={sectionData} darkMode={darkMode} />;
      case 'experience': return <Experience content={sectionData} darkMode={darkMode} />;
      case 'skills': return <Skills content={sectionData} darkMode={darkMode} />;
      case 'projects': return <Projects content={sectionData} darkMode={darkMode} />;
      case 'education': return <Education content={sectionData} darkMode={darkMode} />;
      case 'certifications': return <Certifications content={sectionData} darkMode={darkMode} />;
      case 'contact': return <Contact content={sectionData} darkMode={darkMode} />;
      case 'chat': return <Chat 
        content={sectionData} 
        darkMode={darkMode} 
        messages={chatMessages} 
        setMessages={setChatMessages} 
        handleNavClick={handleNavClick}
      />;
      default: return null;
    }
  };

  const slideVariants = {
    enter: (direction) => ({ y: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, y: direction < 0 ? 30 : -30, opacity: 0 })
  };

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-500 flex ${darkMode ? 'bg-[#0a0a0c] text-slate-100' : 'bg-[#f4f7f9] text-slate-900'}`}>
      
      {/* Sidebar Component */}
      <Sidebar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        sections={sections}
        meta={portfolioData.meta}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main 
        className={`flex-1 h-full relative transition-all duration-500 ease-in-out flex flex-col pt-4 md:pt-6 px-4 md:px-6 pb-4 md:pb-6 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        } ${isRightPanelOpen ? 'mr-[300px]' : 'mr-0'}`}
      >
        {/* Background Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[160px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/5 blur-[160px]" />
        </div>

        {/* Outer AI Container */}
        <div className={`flex-1 relative z-10 ai-container flex flex-col ${
          darkMode ? 'glass-dark' : 'glass-light shadow-ai'
        }`}>
          
          {/* Header Bar */}
          <header className="px-8 py-6 flex items-center justify-between border-b border-white/10 dark:border-white/5">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-black tracking-tight capitalize select-none opacity-80">
                {activeSection === 'chat' ? 'AI Assistant' : activeSection}
              </h2>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
               <button 
                  onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                  className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <FiChevronRight className={`transition-transform duration-300 ${!isRightPanelOpen ? 'rotate-180' : ''}`} />
               </button>
            </div>
          </header>

          {/* Content Scroll Area */}
          <div className={`flex-1 overflow-x-hidden min-h-0 custom-scrollbar ${activeSection === 'chat' ? 'overflow-hidden flex flex-col' : 'overflow-y-auto p-6 md:p-10'}`}>
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={pageIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full flex flex-col"
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Info Area */}
          <footer className="p-4 text-center">
            <p className="text-[10px] md:text-xs opacity-40 font-medium tracking-wide">
              Narayan Prasad Portfolio v2.0 • Powered by Modern Web Tech
            </p>
          </footer>
        </div>
      </main>

      {/* Right Panel Component */}
      <RecentProjectsPanel 
        isOpen={isRightPanelOpen} 
        projects={portfolioData.sections.projects.content} 
        darkMode={darkMode}
        handleNavClick={handleNavClick}
      />
    </div>
  );
}

export default App;
