import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '../ui';
import { FiBookOpen, FiStar, FiChevronRight } from 'react-icons/fi';

const Education = ({ content, darkMode }) => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="section-title text-center mb-16">{content.title}</h2>
      
      <div className="space-y-6">
        {content.content.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card darkMode={darkMode} className="p-8 group hover:border-blue-500/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FiBookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-1 group-hover:text-blue-500 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-lg font-bold opacity-70 mb-2">{edu.university}</p>
                    <div className="flex items-center gap-4 text-sm font-semibold opacity-50">
                      <span className="flex items-center gap-1"><FiChevronRight /> Class of {edu.year}</span>
                      {edu.percentage && <span className="flex items-center gap-1 text-blue-500"><FiStar /> {edu.percentage}% Aggregate</span>}
                    </div>
                  </div>
                </div>
                {edu.percentage && (
                  <div className="md:text-right">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20">
                      Distinction
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
