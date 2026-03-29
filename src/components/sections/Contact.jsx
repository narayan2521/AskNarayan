import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from '../ui';
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = ({ content, darkMode }) => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="section-title text-center mb-16">{content.title}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter">Let's Connect</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Open for collaborations, interesting projects, or just a coffee chat about software engineering and design systems.
              </p>
            </div>
            
            <div className="grid gap-6">
              <a href={`mailto:${content.content.email}`} className="group flex items-center gap-6 p-6 rounded-2xl bg-blue-600/5 hover:bg-blue-600 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-blue-600/10">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <FiMail size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">Email Me</p>
                  <p className="text-xl font-bold">{content.content.email}</p>
                </div>
              </a>
              
              <div className="flex gap-4">
                <a href={content.content.linkedin} className="flex-1 group flex items-center gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-slate-200 dark:border-slate-700">
                  <FiLinkedin size={24} className="shrink-0" />
                  <span className="text-lg font-bold">LinkedIn</span>
                </a>
                <a href={content.content.github} className="flex-1 group flex items-center gap-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-900 dark:hover:bg-slate-900 text-slate-900 dark:text-slate-100 hover:text-white transition-all duration-500 border border-slate-200 dark:border-slate-700">
                  <FiGithub size={24} className="shrink-0" />
                  <span className="text-lg font-bold">GitHub</span>
                </a>
              </div>
              
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-50">Location</p>
                  <p className="text-xl font-bold">{content.content.location}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card darkMode={darkMode} className="p-10 border-0 shadow-2xl">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Name</label>
                  <input type="text" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Email</label>
                  <input type="email" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Message</label>
                <textarea rows="6" className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-blue-600 focus:bg-transparent outline-none transition-all font-semibold resize-none" placeholder="How can I help you?"></textarea>
              </div>
              <Button type="submit" className="w-full py-5 text-lg font-black uppercase tracking-tighter">
                <span>Send Message</span>
                <FiSend size={20} />
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
