import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-reveal wrapper.
 *
 * `priority` must be set on anything above the fold. Without it the element is
 * prerendered with an inline `opacity:0`, so the browser paints nothing there
 * until framer-motion has hydrated — which pushed LCP render delay past 5s on
 * mobile. Priority elements are prerendered fully visible and only animate on
 * subsequent client-side navigations.
 */
const Reveal = ({
  as = 'div',
  delay = 0,
  priority = false,
  className = '',
  children,
  ...props
}) => {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const skipInitial = priority || reduceMotion;

  return (
    <Tag
      initial={skipInitial ? false : { opacity: 0, y: 16 }}
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
