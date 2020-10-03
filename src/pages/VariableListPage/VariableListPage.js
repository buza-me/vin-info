import './VariableListPage.css';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextContext, StoreContext } from 'Contexts';
import { VariableList, Header, Button, Loader } from 'Components';
import { VARIABLES_ROUTE, ROOT_ROUTE } from 'Constants';

export const VariableListPage = () => {
  const history = useHistory();
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const initVariables = getFromStore('getVariablesAsync');
  const variables = getFromStore('variables');
  const listItemLinkTitle = useMemo(() => getText('varListPage.listItemLinkTitle'), [getText]);

  // init:
  useEffect(() => {
    if (!variables?.length) {
      setIsLoading(true);
      initVariables().finally(() => setIsLoading(false));
    }
  }, [variables, initVariables]);

  const listTitle = useMemo(() => variables?.Message, [variables]);

  const header = useMemo(
    () => (
      <Header title={getText('varListPage.headerTitle')}>
        <Button type='button' onClick={() => history.push(ROOT_ROUTE)}>
          {getText('varListPage.linkToMainPageText')}
        </Button>
      </Header>
    ),
    [getText]
  );

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
  }, [variables, listItemLinkTitle]);

  const loader = useMemo(() => <Loader centered />, []);

  return (
    <main className='var-list-page__container'>
      {header}
      {isLoading ? loader : <VariableList data={suitableVariables} title={listTitle} />}
    </main>
  );
};
