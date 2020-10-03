import './Button.css';
import React from 'react';

export const Button = ({
  children,
  className = '',
  onClick = () => null,
  type = 'button',
  value,
  id = '',
  disabled = false,
}) => (
  <button
    id={id}
    type={type}
    value={value}
    className={`button__container${disabled ? ' disabled' : ''} ${className}`}
    onClick={(event) => !disabled && onClick(event)}
  >
    {children}
  </button>
);
