import './ErrorPage.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROOT_ROUTE } from 'Constants';
import { TextContext } from 'Contexts';

export const ErrorPage = () => {
  const { getText } = useContext(TextContext);
  return (
    <main className='error-page__container'>
      <h1 className='error-page__header'>{getText('errorPage.header')}</h1>
      <Link to={ROOT_ROUTE} className='error-page__link'>
        {getText('errorPage.linkText')}
      </Link>
    </main>
  );
};
