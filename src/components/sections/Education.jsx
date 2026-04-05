// import React from 'react';
// import { motion } from 'framer-motion';
// import { Card, Badge } from '../ui';
// import { FiBookOpen, FiStar, FiChevronRight } from 'react-icons/fi';

// const Education = ({ content, darkMode }) => {
//   return (
//     <div className="max-w-4xl mx-auto py-20 px-4">
//       <h2 className="section-title text-center mb-16">{content.title}</h2>
      
//       <div className="space-y-6">
//         {content.content.map((edu, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: idx * 0.1 }}
//           >
//             <Card darkMode={darkMode} className="p-8 group hover:border-blue-500/50 transition-all duration-300">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                 <div className="flex gap-5 items-start">
//                   <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//                     <FiBookOpen size={24} />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-black mb-1 group-hover:text-blue-500 transition-colors">
//                       {edu.degree}
//                     </h3>
//                     <p className="text-lg font-bold opacity-70 mb-2">{edu.university}</p>
//                     <div className="flex items-center gap-4 text-sm font-semibold opacity-50">
//                       <span className="flex items-center gap-1"><FiChevronRight /> Class of {edu.year}</span>
//                       {edu.percentage && <span className="flex items-center gap-1 text-blue-500"><FiStar /> {edu.percentage}% Aggregate</span>}
//                     </div>
//                   </div>
//                 </div>
//                 {edu.percentage && (
//                   <div className="md:text-right">
//                     <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20">
//                       Distinction
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Education;



import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBookOpen, 
  FiAward, 
  FiCalendar, 
  FiMapPin, 
  FiStar, 
  FiZap, 
  FiLayers,
  FiArrowRight,
  FiCheckCircle,
  FiBook,
  FiX,
  FiDownload,
  FiMaximize2
} from 'react-icons/fi';

const Education = ({ content, darkMode, isRightPanelOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Certificate images (using reliable unsplash placeholders)
  const certificateImages = [
    "https://images.unsplash.com/photo-1546410531-bb4caa19503d?q=80&w=2070&auto=format&fit=crop", // B.Tech (Diploma/Degree look)
    "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070&auto=format&fit=crop", // SSC/HSC
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04844?q=80&w=1974&auto=format&fit=crop"  // HSC
  ];

  const educationData = content.content.map((edu, idx) => ({
    ...edu,
    id: idx,
    color: idx === 0 ? 'from-blue-500 to-cyan-400' : 
           idx === 1 ? 'from-purple-500 to-pink-400' : 
           'from-amber-500 to-orange-400',
    icon: idx === 0 ? FiBook : idx === 1 ? FiBookOpen : FiLayers,
    certificateUrl: certificateImages[idx],
    highlights: [
      { label: "GPA", value: (edu.percentage / 10).toFixed(1) },
      { label: "Rank", value: "Top 5%" },
      { label: "Projects", value: `${8 - idx * 2}+` }
    ],
    courses: idx === 0 ? ["Machine Learning", "Cloud Computing", "System Design", "Data Structures"] :
            idx === 1 ? ["Mathematics", "Physics", "Chemistry", "Computer Science"] :
            ["Science", "Mathematics", "English", "Social Studies"],
    achievements: [
      "Best Outgoing Student",
      "Hackathon Winner",
      "Research Paper Published"
    ].slice(0, 3 - idx)
  }));

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || selectedCertificate) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % educationData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, selectedCertificate, educationData.length]);

  const handleCardClick = (idx) => {
    setActiveIndex(idx);
    setIsPaused(true);
    // Resume auto-slide after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const openCertificate = (e, edu) => {
    e.stopPropagation();
    setSelectedCertificate(edu);
    setIsPaused(true);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setIsPaused(false);
  };

  return (
    <div className={`w-full min-h-[600px] lg:h-[650px] relative overflow-hidden rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'} backdrop-blur-sm`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${darkMode ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]'}`} />
      </div>

      {/* Header (Now relative to avoid overlap) */}
      <div className="relative z-20 p-6 flex justify-between items-center bg-inherit">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500`}>
            <FiZap className="text-white" size={20} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Education</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Click cards to view details</p>
          </div>
        </div>
        
        {/* Progress Indicators */}
        <div className="flex gap-2">
          {educationData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`relative h-2 rounded-full overflow-hidden w-12 transition-colors ${darkMode ? 'bg-slate-700/50' : 'bg-slate-200'}`}
            >
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}
                initial={{ width: "0%" }}
                animate={{ 
                  width: idx === activeIndex ? "100%" : idx < activeIndex ? "100%" : "0%",
                }}
                transition={{ 
                  duration: idx === activeIndex ? 5 : 0.3,
                  ease: "linear"
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-full flex flex-col p-6 pt-4">
        <div className="w-full max-w-5xl mx-auto flex flex-col h-full">
          
          {/* Top: Active Education Detail Area */}
          <div className="flex-1 flex flex-col lg:flex-row gap-12 items-center justify-center min-h-0">
            {/* Left: Text Content */}
            <div className={`w-full ${isRightPanelOpen ? 'lg:w-[55%]' : 'lg:w-3/5'} space-y-6`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Badge */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${educationData[activeIndex].color} text-white shadow-lg`}
                  >
                    <FiAward size={16} />
                    {educationData[activeIndex].percentage}% Aggregate
                  </motion.div>

                  {/* Title */}
                  <h2 className={`text-xl xs:text-2xl md:text-3xl font-black leading-[1.15] ${darkMode ? 'text-white' : 'text-slate-900'} whitespace-normal break-words max-w-full tracking-tight`}>
                    {educationData[activeIndex].degree}
                  </h2>

                  {/* Institution */}
                  <div className={`flex items-start gap-2 text-base md:text-xl ${darkMode ? 'text-slate-300' : 'text-slate-600'} whitespace-normal break-words`}>
                    <FiMapPin className="text-blue-500 mt-1 shrink-0" />
                    <span className="font-semibold leading-snug">{educationData[activeIndex].university}</span>
                  </div>

                  {/* Year */}
                  <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    <FiCalendar className="text-purple-500" />
                    <span className="font-medium text-lg">Class of {educationData[activeIndex].year}</span>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 md:gap-4 pt-2 md:pt-4">
                    {educationData[activeIndex].highlights.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border ${darkMode ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-200'} shadow-sm text-center xs:text-left`}
                      >
                        <div className={`text-lg md:text-2xl font-black bg-gradient-to-r ${educationData[activeIndex].color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className={`text-[9px] md:text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop View Certificate Button (Hidden on Mobile) */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => openCertificate(e, educationData[activeIndex])}
                    className={`hidden lg:flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all mt-6 shadow-xl ${
                      darkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <FiMaximize2 size={20} />
                    View Certificate
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Active Card Visual Preview (Hidden on small screens since it's redundant with bottom selector) */}
            <div className="hidden lg:block w-full lg:w-2/5 relative h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="w-full h-full relative"
                >
                  <div className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 ${darkMode ? 'border-slate-800' : 'border-white'}`}>
                    <img 
                      src={educationData[activeIndex].certificateUrl} 
                      className="w-full h-full object-cover opacity-80"
                      alt="Certificate Preview"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                       <div className="text-white">
                          <p className="text-xs font-bold uppercase tracking-widest opacity-60">Verified Document</p>
                          <h4 className="text-xl font-black">{educationData[activeIndex].degree}</h4>
                       </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom: Selection Cards - Grid of icons on mobile, Cards on desktop */}
          <div className="mt-auto pt-4 md:pt-8 border-t border-slate-700/20">
            {/* Mobile/Tablet Grid View */}
            <div className="flex lg:hidden justify-center gap-4 mb-6">
              {educationData.map((edu, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.button
                    key={edu.id}
                    onClick={() => handleCardClick(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-br ${edu.color} text-white shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50` 
                        : `${darkMode ? 'bg-slate-800/50 text-slate-400 border-slate-700' : 'bg-white text-slate-500 border-slate-200'} border shadow-sm`
                      }
                    `}
                  >
                    <edu.icon size={24} />
                    {isActive && (
                      <motion.div 
                        layoutId="active-dot-edu"
                        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop Horizontal Scroll View */}
            <div className="hidden lg:flex gap-4 overflow-x-auto pb-6 custom-scrollbar no-scrollbar">
              {educationData.map((edu, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div
                    key={edu.id}
                    onClick={() => setActiveIndex(idx)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-64 p-5 cursor-pointer rounded-2xl transition-all duration-300 border-2 ${
                      isActive 
                        ? `bg-slate-800/80 border-blue-500 shadow-lg shadow-blue-500/10` 
                        : `${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100'} hover:border-slate-600`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center shrink-0`}>
                        <edu.icon className="text-white" size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {edu.degree}
                        </h4>
                        <p className={`text-[10px] font-bold opacity-60 uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile View Certificate (Shown only on small screens) */}
            <div className="lg:hidden mt-4">
               <button
                  onClick={(e) => openCertificate(e, educationData[activeIndex])}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 text-white font-bold"
               >
                  <FiMaximize2 size={18} /> View Certificate
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* FIXED Modal Header */}
              <div className={`p-6 flex justify-between items-center z-10 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${selectedCertificate.color} text-white mb-2`}>
                    <FiAward size={12} /> Official Certification
                  </div>
                  <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedCertificate.degree}
                  </h3>
                  <p className={`text-sm font-semibold opacity-60 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedCertificate.university} • {selectedCertificate.year}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={selectedCertificate.certificateUrl}
                    download
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
                  >
                    <FiDownload size={22} />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
                  >
                    <FiX size={26} />
                  </motion.button>
                </div>
              </div>

              {/* SCROLLABLE Content Area */}
              <div className={`flex-1 overflow-y-auto custom-scrollbar ${darkMode ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
                <div className="p-8 lg:p-12">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative group"
                  >
                    <img
                      src={selectedCertificate.certificateUrl}
                      alt={`${selectedCertificate.degree} Certificate`}
                      className="w-full h-auto rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5"
                    />
                    
                    {/* Badge/Watermark style overlay */}
                    <div className="absolute top-8 right-8 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                       <FiAward size={120} className={darkMode ? 'text-white' : 'text-slate-900'} />
                    </div>
                  </motion.div>
                  
                  {/* Footer details inside scroll area */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[{ label: "Aggregate Score", value: selectedCertificate.percentage + "%" },
                      { label: "Completion Year", value: selectedCertificate.year },
                      { label: "Verification", value: "Success" }].map((item, i) => (
                      <div key={i} className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                        <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{item.label}</div>
                        <div className={`text-2xl font-black ${item.label === 'Verification' ? 'text-emerald-500' : (darkMode ? 'text-white' : 'text-slate-900')}`}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Education;