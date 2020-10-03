import './VariableListItem.css';
import React from 'react';
import { Link } from 'Components';

export const VariableListItem = ({ item }) => (
  <li className='variable-list-item__container'>
    <div className='variable-list-item__text-content-wrapper'>
      <span className='variable-list-item__name-field'>{item?.name}</span>
      <span className='variable-list-item__value-field'>{item?.value}</span>
    </div>
    <Link className='variable-list-item__link' to={item?.link?.url ?? '#'}>
      {item?.link?.title}
    </Link>
  </li>
);
