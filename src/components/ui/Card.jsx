import React from 'react';

const Card = ({ as: Tag = 'div', hover = false, className = '', children, ...props }) => (
  <Tag
    className={`rounded-card border border-line bg-surface ${
      hover
        ? 'transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0'
        : ''
    } ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default Card;
