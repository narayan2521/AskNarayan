import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiLayout, FiZap, FiArrowRight, FiActivity } from 'react-icons/fi';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 20}s`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400/30 animate-fall"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            '--fall-duration': p.duration,
            animationDelay: p.delay,
            top: '-5vh'
          }}
        />
      ))}
    </div>
  );
};

const LandingPage = ({ onEnter, darkMode }) => {
  const [phase, setPhase] = useState('intro'); // intro, transition, terminal, exit
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const welcomeLines = [
    { text: "Hello, Welcome to my world!", color: "text-cyan-400 font-bold" },
    { text: "I am Narayan Prasad", color: "text-white font-black text-xl md:text-3xl" },
    { text: "A Frontend Developer with 3+ years of experience building beautiful, performant web experiences.", color: "text-slate-400" }
  ];

  // Typing Effect Logic (same as before)
  useEffect(() => {
    if (phase !== 'terminal') return;

    if (currentLineIndex < welcomeLines.length) {
      const line = welcomeLines[currentLineIndex].text;
      let charIndex = 0;

      const interval = setInterval(() => {
        setTypedLines(prev => {
          const newTyped = [...prev];
          if (!newTyped[currentLineIndex]) newTyped[currentLineIndex] = "";
          newTyped[currentLineIndex] = line.slice(0, charIndex + 1);
          return newTyped;
        });

        charIndex++;
        if (charIndex === line.length) {
          clearInterval(interval);
          setTimeout(() => setCurrentLineIndex(prev => prev + 1), 600);
        }
      }, 40);

      return () => clearInterval(interval);
    } else {
      setTimeout(() => setPhase('exit'), 2000);
    }
  }, [phase, currentLineIndex]);

  // Handle auto-exit transition to main app
  useEffect(() => {
    if (phase === 'exit') {
      setTimeout(onEnter, 1000);
    }
  }, [phase, onEnter]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${darkMode ? 'bg-[#050505]' : 'bg-[#f0f4f8]'}`}>

      {/* Technical Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      <ParticleBackground />

      <AnimatePresence mode="wait">

        {/* PHASE 1: INITIAL INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl px-6"
          >
            {/* SaaS Badges */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400"
              >
                Portfolio v2.0
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </motion.div>
            </div>

            {/* Branding */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FiZap className="text-white text-xl" />
              </div> */}
              <span className="text-xl font-black tracking-tighter uppercase italic opacity-80">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-3 overflow-hidden whitespace-nowrap"
                >
                  <img
                    src="/ask-narayan-logo.png"
                    alt="Narayan Prasad"
                    className="w-full h-auto max-h-30 object-contain px-2"
                  />
                </motion.div>
              </span>
            </motion.div>

            {/* High-Impact Message */}
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95] text-white">
              DON'T JUST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-glow-cyan">SCROLL</span>
              <br />
              <span className="opacity-90 italic text-glow-white">INTERACT WITH IT.</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Experience a new dimension of professional storytelling through an <span className="text-white">intelligent</span>, interactive core.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('transition')}
              className="group relative px-8 py-4 bg-white text-black dark:bg-slate-900 dark:text-white rounded-2xl font-black text-lg tracking-tight overflow-hidden shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white">
                EXPLORE MY WORLD
                <FiArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* PHASE 2: SYSTEM LINK ANIMATION */}
        {phase === 'transition' && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setTimeout(() => setPhase('terminal'), 1500)}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black"
          >
            {/* Scanline Effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>

            {/* Tech Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 5, -5, 2, 0],
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-white flex flex-col items-center gap-6"
            >
              <FiActivity className="text-6xl text-cyan-500 animate-pulse" />
              <div className="text-xs font-black tracking-[0.5em] uppercase text-cyan-500/50">Linking Systems...</div>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 3: TERMINAL POP-UP */}
        {(phase === 'terminal' || phase === 'exit') && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -100 }}
            className="relative z-[120] w-full max-w-3xl px-4"
          >
            <div className="rounded-[2.5rem] p-1 bg-gradient-to-b from-slate-700/50 to-slate-900/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[2.2rem] border border-white/10 overflow-hidden min-h-[400px] flex flex-col">

                {/* Window Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
                    <FiTerminal className="text-blue-500" />
                    welcome.txt — Narayan's Workspace
                  </div>
                  <div className="w-12 h-1" /> {/* Spacer */}
                </div>

                {/* Window Content */}
                <div className="p-10 md:p-14 flex-1 font-mono space-y-8">
                  {typedLines.map((line, idx) => (
                    <div key={idx} className={`${welcomeLines[idx].color} leading-relaxed`}>
                      {line}
                    </div>
                  ))}

                  {/* Cursor */}
                  {currentLineIndex < welcomeLines.length && (
                    <motion.span
                      animate={{ opacity: showCursor ? [1, 0, 1] : 1 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-6 bg-cyan-400 align-middle ml-1"
                    />
                  )}

                  {/* Readiness hint */}
                  {currentLineIndex === welcomeLines.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-16 flex items-center justify-center"
                    >
                      <div className="flex items-center gap-4 text-xs font-black tracking-[0.3em] uppercase text-slate-600">
                        <span className="w-12 h-px bg-slate-800" />
                        Initializing Dashboard
                        <span className="w-12 h-px bg-slate-800" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
