import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';
import { FiAward, FiExternalLink } from 'react-icons/fi';

const Certifications = ({ content, darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="section-title text-center mb-16">{content.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.content.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card darkMode={darkMode} className="p-6 flex items-center gap-6 group hover:border-blue-500 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <FiAward size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 leading-tight">{cert.name}</h3>
                <p className="text-sm font-semibold opacity-50 uppercase tracking-widest">{cert.platform}</p>
              </div>
              <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
