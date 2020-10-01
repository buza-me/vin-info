import './ErrorMessage.css';
import React from 'react';

export const ErrorMessage = ({ children, hidden, className }) => (
  <span className={`error-message__container ${className}`} hidden={hidden}>
    {children}
  </span>
);
