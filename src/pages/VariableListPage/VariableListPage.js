import './VariableListPage.css';
import React, { useContext } from 'react';
import { TextContext } from 'Contexts';

export const VariableListPage = () => {
  const { getText } = useContext(TextContext);
  return <main className='var-list-page__container'>{getText('variable list page dummy')}</main>;
};
