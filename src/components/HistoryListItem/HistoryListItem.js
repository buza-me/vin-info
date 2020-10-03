import './HistoryListItem.css';
import React from 'react';
import { Button } from 'Components';

export const HistoryListItem = ({ item, isActive }) => (
  <li className={`history-list-item__container${isActive ? ' active' : ''}`}>
    <span className='history-list-item__title'>{item?.of}</span>
    <Button
      className='history-list-item__button'
      onClick={() => item?.action?.callback(item)}
      disabled={isActive}
    >
      {item?.action?.title}
    </Button>
  </li>
);
