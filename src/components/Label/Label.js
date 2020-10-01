import './Label.css';
import React from 'react';

export const Label = ({ htmlFor = '', required, children, className = '' }) => (
  <label className={`label__container ${className}`} htmlFor={htmlFor}>
    {children}
    {required ? <sup className='label__star'> *</sup> : null}
  </label>
);
