import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui';

// A simple global flag so the typing effect only happens on the FIRST visit
let hasVisitedAbout = false;

const TypewriterText = ({ text, delay = 0, onComplete, skipAnimation = false }) => {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : '');
  const [isTyping, setIsTyping] = useState(!skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    let timer;
    
    // Initial delay before starting
    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, 15); // typing speed
    }, delay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, [text, delay, skipAnimation]);

  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
      {isTyping && (
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2.5 h-5 bg-green-500 ml-1 translate-y-1"
        />
      )}
    </>
  );
};

const About = ({ content }) => {
  const [typingComplete, setTypingComplete] = useState(hasVisitedAbout);

  useEffect(() => {
    // Mark as visited when the component mounts
    return () => {
      hasVisitedAbout = true;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-8">
      
      {/* Terminal Window Area */}
      <motion.div
        initial={!hasVisitedAbout ? { opacity: 0, y: 30 } : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 bg-[#0d1117] border border-slate-800 mb-16"
      >
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-slate-800">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center font-mono text-xs text-slate-400 font-semibold tracking-wider">
            narayan@workspace:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed text-slate-300">
          <div className="mb-6 flex gap-3 text-green-400 font-bold">
            <span className="text-blue-400">narayan</span>@<span className="text-purple-400">portfolio</span>:~$ 
            <span className="text-white">cat about_me.txt</span>
          </div>

          <div className="mb-8">
            <TypewriterText 
              text={content.content.bio} 
              delay={500} 
              skipAnimation={hasVisitedAbout}
              onComplete={() => setTypingComplete(true)} 
            />
          </div>

          {/* Render remaining paragraphs only after bio finishes typing (or if already visited) */}
          <AnimatePresence>
            {typingComplete && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {content.content.paragraphs.map((para, i) => (
                  <p key={i} className="text-slate-400">&gt; {para}</p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {typingComplete && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="mt-8 flex gap-3 text-green-400 font-bold"
            >
              <span className="text-blue-400">narayan</span>@<span className="text-purple-400">portfolio</span>:~$ 
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
                className="w-3 h-5 bg-slate-400 inline-block translate-y-1 ml-2" 
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Core Technologies - Floating Interactive Grid */}
      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">
                Tech Stack
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-4">
              {content.content.technologies.map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    rotate: Math.random() > 0.5 ? 2 : -2 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-crosshair"
                >
                  <Badge className="px-5 py-3 text-sm md:text-base font-bold bg-[#0d1117] text-blue-400 border border-slate-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default About;
