import './VariableListPage.css';
import React, { useContext, useEffect, useMemo } from 'react';
import { TextContext, StoreContext } from 'Contexts';
import { VariableList } from 'Components';
import { VARIABLES_ROUTE } from 'Constants';

export const VariableListPage = () => {
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const initVariables = getFromStore('getVariablesAsync');
  const variables = getFromStore('variables');
  const listItemLinkTitle = useMemo(() => getText('varListPage.listItemLinkTitle'), [getText]);
  // const pageTitle = useMemo(() => getText('varListPage.headerTitle'), [getText]);
  // const mainPageLinkText = useMemo(() => getText('varListPage.mainPageLinkText'), [getText]);

  // init:
  useEffect(() => {
    if (!variables?.length) {
      initVariables();
    }
  }, [variables, initVariables]);

  const listTitle = useMemo(() => variables?.Message, [variables]);

  const suitableVariables = useMemo(() => {
    const parser = new DOMParser();
    return variables?.Results.filter((item) => item).map(({ Description, ID, Name }) => ({
      name: Name,
      value: parser.parseFromString(Description, 'text/html')?.documentElement?.textContent ?? '',
      id: ID,
      link: {
        url: `${VARIABLES_ROUTE}/${ID}`,
        title: listItemLinkTitle,
      },
    }));
  }, [variables]);

  return (
    <main className='var-list-page__container'>
      <VariableList data={suitableVariables} title={listTitle} />
    </main>
  );
};
