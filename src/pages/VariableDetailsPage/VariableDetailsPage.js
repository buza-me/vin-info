import './VariableDetailsPage.css';
import React, { useContext } from 'react';
import { TextContext } from 'Contexts';

export const VariableDetailsPage = () => {
  const { getText } = useContext(TextContext);
  return (
    <main className='var-details-page__container'>{getText('variable details page dummy')}</main>
  );
};
