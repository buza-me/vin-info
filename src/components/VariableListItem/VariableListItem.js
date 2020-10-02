import './VariableListItem.css';
import React from 'react';
import { Link } from 'Components';

export const VariableListItem = ({ item }) => (
  <li className='variable-list-item__container'>
    <span className='variable-list-item__name-field'>{item?.name}</span>
    <span className='variable-list-item__value-field'>{item?.value}</span>
    <Link className='variable-list-item__link' to={item?.link?.url ?? '#'}>
      {item?.link?.title}
    </Link>
  </li>
);
