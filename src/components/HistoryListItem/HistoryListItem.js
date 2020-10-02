import './HistoryListItem.css';
import React from 'react';
import { Button } from 'Components';

export const HistoryListItem = ({ item, isActive }) => (
  <li className='history-list-item__container' active={isActive}>
    <span className='history-list-item__title'>{item?.of}</span>
    <Button className='history-list-item__button' onClick={() => item?.action?.callback(item)}>
      {item?.action?.name}
    </Button>
  </li>
);
