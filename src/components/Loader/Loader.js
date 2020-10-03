import './Loader.css';
import React from 'react';

export const Loader = ({ className, centered }) =>
  centered ? (
    <div className='loader__wrapper'>
      <div className={`loader__body ${className}`} />
    </div>
  ) : (
    <div className={`loader__body ${className}`} />
  );
