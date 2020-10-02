import './VariableDetailsPage.css';
import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextContext, StoreContext } from 'Contexts';
import { Button, Header, ValuesList } from 'Components';
import { ROOT_ROUTE } from 'Constants';

export const VariableDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const initSelectedVariable = getFromStore('getSelectedVariableAsync');
  const selectedVariable = getFromStore('selectedVariable');

  // init:
  useEffect(() => {
    initSelectedVariable(id);
  }, []);

  const header = useMemo(
    () => (
      <Header title={getText('varDetailsPage.title')}>
        <Button type='button' onClick={() => history.push(ROOT_ROUTE)}>
          {getText('varDetailsPage.navToMainPageText')}
        </Button>
        <Button type='button' onClick={() => history.goBack()}>
          {getText('varDetailsPage.navBackText')}
        </Button>
      </Header>
    ),
    [getText, history]
  );

  const suitableValues = useMemo(() => selectedVariable?.Results?.map((item) => item.Name) || [], [
    selectedVariable,
  ]);

  const valuesList = useMemo(
    () => (
      <ValuesList
        title={selectedVariable?.Message}
        name={selectedVariable?.Results?.[0]?.ElementName}
        data={suitableValues}
      />
    ),
    [suitableValues, selectedVariable]
  );

  return (
    <main className='var-details-page__container'>
      {header}
      {valuesList}
    </main>
  );
};
