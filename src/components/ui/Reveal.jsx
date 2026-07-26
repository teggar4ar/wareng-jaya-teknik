import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Reveal = ({ as = 'div', delay = 0, className = '', children, ...props }) => {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
