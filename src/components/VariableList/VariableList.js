import './VariableList.css';
import React from 'react';
import { VariableListItem } from 'Components';

export const VariableList = ({ data, title }) => (
  <ul className='variable-list__container'>
    {title ? <li className='variable-list__title'>{title}</li> : null}
    {data?.map?.((item) => (
      <VariableListItem item={item} key={item.id} />
    ))}
  </ul>
);
