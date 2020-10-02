import './VinPage.css';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { TextContext, StoreContext } from 'Contexts';
import { VinForm, VariableList, HistoryList, Link } from 'Components';
import { VARIABLES_ROUTE } from 'Constants';

export const VinPage = () => {
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);

  const decodeVin = getFromStore('decodeVinAsync');
  const decodeHistory = getFromStore('decodeHistory');
  const selectedHistoryItem = getFromStore('selectedDecodeResults');
  const selectHistoryItem = getFromStore('setSelectedDecodeResults');

  const [isLoading, setIsLoading] = useState(false);

  const linkTitle = useMemo(() => getText('vinPage.variableList.linkTitle'), [getText]);
  const formTitle = useMemo(() => getText('vinPage.form.title'), [getText]);
  const formInputPlaceholder = useMemo(() => getText('vinPage.form.inputPlaceholder'), [getText]);
  const formValidationErrorMessage = useMemo(() => getText('vinPage.form.validationError'), [
    getText,
  ]);
  const formActionTitle = useMemo(() => getText('vinPage.form.submitButtonTitle'), [getText]);
  const variablesPageLinkTitle = useMemo(() => getText('vinPage.link.variablesPage'), [getText]);
  const historyListTitle = useMemo(() => getText('vinPage.history.title'), [getText]);
  const historyActionTitle = useMemo(() => getText('vinPage.history.actionTitle'), [getText]);

  const pageTitle = useMemo(() => <h1>{getText('vinPage.title')}</h1>, [getText]);

  const formCallback = useCallback(
    (value) => {
      if (!isLoading) {
        setIsLoading(true);
        decodeVin(value).finally(() => setIsLoading(false));
      }
    },
    [decodeVin, isLoading]
  );

  const form = useMemo(
    () => (
      <VinForm
        action={{ title: formActionTitle, callback: formCallback }}
        label={formTitle}
        validationError={formValidationErrorMessage}
        inputPlaceholder={formInputPlaceholder}
      />
    ),
    [decodeVin, getText, formCallback]
  );

  const suitableHistory = useMemo(
    () =>
      decodeHistory.map((item, index) => ({
        of: item.of,
        id: index,
        action: {
          title: historyActionTitle,
          callback: () => selectHistoryItem(item),
        },
      })),
    [decodeHistory, selectedHistoryItem, selectHistoryItem, historyActionTitle]
  );

  const historyList = useMemo(
    () => (
      <HistoryList
        data={suitableHistory}
        title={historyListTitle}
        activeItem={{ id: decodeHistory.indexOf(selectedHistoryItem) }}
      />
    ),
    [decodeHistory, historyListTitle, selectedHistoryItem]
  );

  const variablesPageLink = useMemo(
    () => <Link to={VARIABLES_ROUTE}>{variablesPageLinkTitle}</Link>,
    [variablesPageLinkTitle]
  );

  const suitableVariables = useMemo(
    () =>
      selectedHistoryItem?.result?.Results?.filter?.((item) => item?.Variable && item?.Value).map(
        ({ Value, Variable, VariableId }) => ({
          name: Variable,
          value: Value,
          id: VariableId,
          link: {
            title: linkTitle,
            url: `${VARIABLES_ROUTE}/${VariableId}`,
          },
        })
      ),
    [selectedHistoryItem, linkTitle]
  );

  const variableListTitle = useMemo(() => selectedHistoryItem?.result?.Message, [
    selectedHistoryItem,
  ]);

  const variableList = useMemo(
    () => <VariableList data={suitableVariables} title={variableListTitle} />,
    [suitableVariables, variableListTitle]
  );

  return (
    <main className='vin-page__container'>
      {pageTitle}
      <div className='vin-page__actions'>
        {form}
        <div className='vin-page__actions_navigation'>
          {historyList}
          {variablesPageLink}
        </div>
      </div>
      {variableList}
    </main>
  );
};
