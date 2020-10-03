import './ValuesList.css';
import React from 'react';
import { ValuesListItem } from 'Components';

export const ValuesList = ({ data, title, name, emptyMessage }) => (
  <ul className='values-list__container'>
    {title ? <li className='values-list__title'>{title}</li> : null}
    {name ? <li className='values-list__var-name'>{`${name}:`}</li> : null}
    {data?.length
      ? data.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ValuesListItem item={item} key={`${item}_${index}`} />
        ))
      : emptyMessage}
  </ul>
);
