import React from 'react';

const Container = ({ as: Tag = 'div', className = '', children, ...props }) => (
  <Tag className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`} {...props}>
    {children}
  </Tag>
);

export default Container;
