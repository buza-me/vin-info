import './Button.css';
import React from 'react';

export const Button = ({ children, className = '', onClick, type = 'button', value, id = '' }) => (
  <button
    id={id}
    type={type}
    value={value}
    className={`button__container ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
