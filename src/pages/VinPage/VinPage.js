import './VinPage.css';
import React, { useContext } from 'react';
import { TextContext } from 'Contexts';

export const VinPage = () => {
  const { getText } = useContext(TextContext);
  return <main className='vin-page__container'>{getText('VIN page dummy content')}</main>;
};
