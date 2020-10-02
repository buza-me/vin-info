/* eslint-disable no-unused-vars */
import './VinPage.css';
import React, { useContext, useEffect, useMemo } from 'react';
import { TextContext, StoreContext } from 'Contexts';
import { useLocation } from 'react-router-dom';
import { VinForm, VariableList, HistoryList } from 'Components';

export const VinPage = () => {
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const initVariables = getFromStore('getVariablesAsync');
  const variables = getFromStore('variables');
  const location = useLocation();

  const linkTitle = useMemo(() => getText('vinPage.variableList.linkTitle'), [getText]);
  const formTitle = useMemo(() => getText('vinPage.variableList.linkTitle'), [getText]);
  const formInputPlaceholder = useMemo(() => getText('vinPage.variableList.linkTitle'), [getText]);
  const formValidationErrorMessage = useMemo(() => getText('vinPage.variableList.linkTitle'), [
    getText,
  ]);
  const formActionTitle = useMemo(() => getText('vinPage.variableList.linkTitle'), [getText]);

  useEffect(() => !variables && initVariables(), []);

  const suitableVariables = useMemo(
    () =>
      variables?.Results?.filter?.((item) => item?.Variable && item?.Value).map(
        ({ Value, Variable, VariableId }) => ({
          name: Variable,
          value: Value,
          id: VariableId,
          link: {
            title: linkTitle,
            url: `${location?.pathname}/${VariableId}`,
          },
        })
      ),
    [variables, linkTitle]
  );
  // eslint-disable-next-line react/self-closing-comp
  return <main className='vin-page__container'></main>;
};
