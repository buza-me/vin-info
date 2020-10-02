import './Link.css';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ to, children, className }) => (
  <RouterLink to={to} className={`link__container ${className}`}>
    {children}
  </RouterLink>
);
