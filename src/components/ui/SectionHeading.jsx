import React from 'react';

const SectionHeading = ({ index, label, title, align = 'left', className = '' }) => (
  <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
    <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
      {index} — {label}
    </p>
    <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-ink md:text-4xl text-balance">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
