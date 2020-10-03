import './Header.css';
import React from 'react';

export const Header = ({ title, children }) => (
  <header className='header__container'>
    <h1 className='header__title'>{title}</h1>
    <section className='header__children-wrapper'>{children}</section>
  </header>
);
