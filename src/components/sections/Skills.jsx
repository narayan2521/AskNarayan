import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '../ui';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const SkillIcon = ({ iconName, colorClass = "" }) => {
  const Icon = FaIcons[iconName] || SiIcons[iconName];
  if (!Icon) return <span className="text-2xl">{'</>'}</span>;
  return <Icon className={`text-3xl ${colorClass}`} />;
};

const Skills = ({ content, darkMode }) => {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="section-title text-center mb-16">{content.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(content.content).map(([category, skills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card darkMode={darkMode} className="h-full p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              
              <h3 className="text-2xl font-black mb-8 capitalize flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" />
                {category}
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <SkillIcon iconName={skill.icon} colorClass={skill.color} />
                    <span className="text-xs font-bold uppercase tracking-wider text-center opacity-80">
                      {skill.name || skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
