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

const Education = ({ content, darkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Certificate images (using reliable unsplash placeholders)
  const certificateImages = [
    "https://images.unsplash.com/photo-1546410531-bb4caa19503d?q=80&w=2070&auto=format&fit=crop", // B.Tech (Diploma/Degree look)
    "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070&auto=format&fit=crop", // SSC/HSC
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop"  // HSC
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
    <div className={`w-full min-h-[850px] lg:h-[650px] relative overflow-hidden rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'} backdrop-blur-sm`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${darkMode ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]'}`} />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
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
      <div className="h-full flex items-start lg:items-center justify-center p-6 pt-24 lg:pt-20">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-center justify-center h-full">
          
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
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
                <h2 className={`text-3xl lg:text-4xl font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {educationData[activeIndex].degree}
                </h2>

                {/* Institution */}
                <div className={`flex items-center gap-2 text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <FiMapPin className="text-blue-500" />
                  <span className="font-semibold">{educationData[activeIndex].university}</span>
                </div>

                {/* Year */}
                <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <FiCalendar className="text-purple-500" />
                  <span className="font-medium">Class of {educationData[activeIndex].year}</span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 pt-2">
                  {educationData[activeIndex].highlights.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}
                    >
                      <div className={`text-xl font-black bg-gradient-to-r ${educationData[activeIndex].color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View Certificate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => openCertificate(e, educationData[activeIndex])}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all mt-4 ${
                    darkMode 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <FiMaximize2 size={18} />
                  View Certificate
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: 3D Card Stack */}
          <div className="w-full lg:w-1/2 relative h-[350px] lg:h-[400px] flex items-center justify-center perspective-1000 mt-12 lg:mt-0">
            {educationData.map((edu, idx) => {
              const offset = idx - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = idx === activeIndex;
              
              return (
                <motion.div
                  key={edu.id}
                  onClick={() => handleCardClick(idx)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  animate={{
                    x: typeof window !== 'undefined' && window.innerWidth < 1024 ? offset * 25 : offset * 45,
                    y: absOffset * 15,
                    scale: isActive ? 1 : 0.85 - absOffset * 0.05,
                    rotateY: offset * -10,
                    rotateX: isActive ? 0 : 8,
                    zIndex: educationData.length - absOffset,
                    opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  whileHover={isActive ? { scale: 1.05, rotateY: 5 } : {}}
                  className={`absolute w-64 h-80 cursor-pointer rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'shadow-black/50' : 'shadow-slate-400/50'}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.color}`} />
                  <div className={`absolute inset-0 ${darkMode ? 'bg-slate-900/90' : 'bg-white/95'}`} />

                  {/* Certificate Preview Thumbnail */}
                  <div 
                    onClick={(e) => openCertificate(e, edu)}
                    className="absolute top-4 left-4 right-4 h-32 rounded-xl overflow-hidden border-2 border-dashed border-slate-400/30 hover:border-blue-500/50 transition-colors cursor-zoom-in group"
                  >
                    <img 
                      src={edu.certificateUrl} 
                      alt={`${edu.degree} certificate`}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                      <FiMaximize2 className="text-white drop-shadow-lg" size={24} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <edu.icon className="text-white" size={24} />
                    </div>
                    
                    <h4 className={`text-lg font-bold mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {edu.degree}
                    </h4>
                    
                    <p className={`text-sm line-clamp-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {edu.university}
                    </p>

                    {/* Progress Bar */}
                    <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${edu.percentage}%` : "0%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r ${edu.color}`}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs font-bold ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {edu.year}
                      </span>
                      <span className={`text-xs font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                        {edu.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                    }}
                    animate={{ x: isActive ? ["100%", "-100%"] : "100%" }}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
                  />
                </motion.div>
              );
            })}
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
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedCertificate.degree}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedCertificate.university} • Class of {selectedCertificate.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.a
                    href={selectedCertificate.certificateUrl}
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                    title="Download"
                  >
                    <FiDownload size={20} />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Certificate Image */}
              <div className={`p-6 overflow-auto max-h-[70vh] ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={selectedCertificate.certificateUrl}
                  alt={`${selectedCertificate.degree} Certificate`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                
                {/* Certificate Details Overlay */}
                <div className={`mt-4 p-4 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className={`text-2xl font-black bg-gradient-to-r ${selectedCertificate.color} bg-clip-text text-transparent`}>
                        {selectedCertificate.percentage}%
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Aggregate Score
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {selectedCertificate.year}
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Year of Completion
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-black text-emerald-500`}>
                        Verified
                      </div>
                      <div className={`text-xs font-bold uppercase tracking-wider mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Status
                      </div>
                    </div>
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