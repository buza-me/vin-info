import './VariableDetailsPage.css';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextContext, StoreContext } from 'Contexts';
import { Button, Header, ValuesList, Loader } from 'Components';
import { ROOT_ROUTE } from 'Constants';

export const VariableDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const initSelectedVariable = getFromStore('getSelectedVariableAsync');
  const selectedVariable = getFromStore('selectedVariable');

  // init:
  useEffect(() => {
    setIsLoading(true);
    initSelectedVariable(id).finally(() => setIsLoading(false));
  }, [initSelectedVariable, id]);

  const header = useMemo(
    () => (
      <Header title={getText('varDetailsPage.title')}>
        <Button type='button' onClick={() => history.goBack()}>
          {getText('varDetailsPage.navBackText')}
        </Button>
        <Button type='button' onClick={() => history.push(ROOT_ROUTE)}>
          {getText('varDetailsPage.navToMainPageText')}
        </Button>
      </Header>
    ),
    [getText, history]
  );

  const suitableValues = useMemo(
    () =>
      selectedVariable?.id === id
        ? selectedVariable?.value?.Results?.map((item) => item.Name) || []
        : [],
    [selectedVariable, id]
  );

  const valuesList = useMemo(
    () => (
      <ValuesList
        title={selectedVariable?.value?.Message}
        name={selectedVariable?.value?.Results?.[0]?.ElementName}
        data={suitableValues}
        emptyMessage={getText('varDetailsPage.listEmptyMessage')}
      />
    ),
    [suitableValues, selectedVariable, getText]
  );

  const loader = useMemo(() => <Loader centered />, []);

  return (
    <main className='var-details-page__container'>
      {header}
      {isLoading ? loader : valuesList}
    </main>
  );
};
