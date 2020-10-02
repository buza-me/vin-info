import './ValuesList.css';
import React from 'react';
import { ValuesListItem } from 'Components';

export const ValuesList = ({ data, title }) => (
  <ul className='values-list__container'>
    {title ? <li className='values-list__title'>{title}</li> : null}
    {data?.map?.((item) => (
      <ValuesListItem item={item} key={item.id} />
    ))}
  </ul>
);
