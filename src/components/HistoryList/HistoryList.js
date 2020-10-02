import './HistoryList.css';
import React from 'react';
import { HistoryListItem } from 'Components';

export const HistoryList = ({ data, activeItem, title }) => (
  <ul className='history-list__container'>
    {title ? <li className='history-list__title'>{title}</li> : null}
    {data?.map?.((item) => (
      <HistoryListItem item={item} isActive={item.id === activeItem.id} key={item.id} />
    ))}
  </ul>
);
