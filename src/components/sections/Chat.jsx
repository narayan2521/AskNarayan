import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiCpu, FiArrowRight } from 'react-icons/fi';

const TypingMessage = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex flex-col">
      <div dangerouslySetInnerHTML={{ __html: displayedText }} />
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-blue-500 ml-1"
        />
      )}
    </div>
  );
};

const Chat = ({ content, darkMode, messages, setMessages, handleNavClick }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Check if AI is currently busy thinking or typing
  const isBusy = isTyping || messages.some(m => m.isNew);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim() || isBusy) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Logic
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = content.content.fallback;
      let redirect = null;

      // Simple keyword matching
      for (const item of content.content.qa) {
        if (item.keywords.some(kw => lowerText.includes(kw))) {
          response = item.answer;
          redirect = item.redirect; // Capture the redirect target
          break;
        }
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        text: response, 
        isNew: true,
        redirect: redirect // Add redirect to message data
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    if (isBusy) return;
    handleSend(suggestion);
  };

  return (
    <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full overflow-hidden">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start max-w-[85%] space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : (darkMode ? 'bg-slate-800 text-blue-400' : 'bg-slate-200 text-blue-600')
                }`}>
                  {msg.type === 'user' ? <FiUser size={16} /> : <FiCpu size={16} />}
                </div>
                
                <div className={`px-4 py-3 rounded-2xl text-sm md:text-base ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg'
                    : (darkMode 
                        ? 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none shadow-xl' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-md')
                }`}>
                  {msg.type === 'ai' && msg.isNew ? (
                    <TypingMessage text={msg.text} onComplete={() => {
                        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isNew: false } : m));
                    }} />
                  ) : (
                    <div className="space-y-3">
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        {msg.redirect && !msg.isNew && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => handleNavClick(msg.redirect)}
                                className={`mt-2 flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                    darkMode 
                                    ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20' 
                                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                }`}
                            >
                                <span>Know More</span>
                                <FiArrowRight size={12} />
                            </motion.button>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-slate-800/20 px-4 py-2 rounded-2xl flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className={`px-4 py-1 flex overflow-x-auto no-scrollbar gap-2 transition-opacity duration-300 ${isBusy ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {(content.content.suggestions || []).map((s, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(s)}
            disabled={isBusy}
            className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 border ${
              darkMode 
                ? 'bg-slate-900 border-white/10 text-slate-400 hover:border-blue-500 hover:text-blue-400' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600 shadow-sm'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="p-2 md:p-6 mb-1 md:mb-2 text-center">
        <div className={`relative group transition-opacity duration-300 ${isBusy ? 'opacity-50' : 'opacity-100'}`}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
          <div className={`relative flex items-center ai-input overflow-hidden ${darkMode ? 'bg-slate-900/50' : 'bg-white'}`}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
              placeholder={isBusy ? " Thinking..." : "Ask..."}
              disabled={isBusy}
              className="flex-1 bg-transparent border-none outline-none py-2 md:py-4 px-3 md:px-6 text-[13px] md:text-base font-medium disabled:cursor-not-allowed"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isBusy}
              className={`p-2 md:p-3 mr-1.5 md:mr-3 rounded-xl transition-all duration-300 ${
                inputValue.trim() && !isBusy
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <FiSend size={14} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
