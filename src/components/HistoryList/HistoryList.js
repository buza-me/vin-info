import './HistoryList.css';
import React from 'react';
import { HistoryListItem } from 'Components';

export const HistoryList = ({ data, activeItem }) => (
  <ul className='history-list__container'>
    {data.map((item) => (
      <HistoryListItem item={item} isActive={item.id === activeItem.id} key={item.id} />
    ))}
  </ul>
);
