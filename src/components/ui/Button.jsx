import React from 'react';
import { Link } from 'react-router-dom';

const NOTCH =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)]';

const VARIANTS = {
  primary: `bg-accent text-accent-ink hover:brightness-110 ${NOTCH}`,
  outline:
    'border border-line text-ink hover:border-accent hover:text-accent bg-transparent',
  whatsapp: `bg-wa text-white hover:brightness-110 ${NOTCH}`,
};

const SIZES = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-7 py-3 text-base',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  children,
  ...props
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-btn font-sans font-semibold tracking-wide transition-[background-color,border-color,color,filter,transform] duration-150 active:scale-[0.98] motion-reduce:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
