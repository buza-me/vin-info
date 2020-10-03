import './VinPage.css';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { TextContext, StoreContext } from 'Contexts';
import { VinForm, VariableList, HistoryList, Link, Header, Loader } from 'Components';
import { VARIABLES_ROUTE } from 'Constants';

export const VinPage = () => {
  const { getText } = useContext(TextContext);
  const { getFromStore } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);

  const decodeVin = getFromStore('decodeVinAsync');
  const decodeHistory = getFromStore('decodeHistory');
  const selectedHistoryItem = getFromStore('selectedDecodeResults');
  const selectHistoryItem = getFromStore('setSelectedDecodeResults');

  const text = useMemo(
    () => ({
      linkTitle: getText('vinPage.variableList.linkTitle'),
      formTitle: getText('vinPage.form.title'),
      formInputPlaceholder: getText('vinPage.form.inputPlaceholder'),
      formActionTitle: getText('vinPage.form.submitButtonTitle'),
      variablesPageLinkTitle: getText('vinPage.link.variablesPage'),
      historyListTitle: getText('vinPage.history.title'),
      historyActionTitle: getText('vinPage.history.actionTitle'),
      historyListEmptyMessage: getText('vinPage.history.empy'),
      formValidationErrorMessage: getText('vinPage.form.validationError'),
    }),
    [getText]
  );

  const header = useMemo(() => <Header title={getText('vinPage.title')} />, [getText]);

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
        action={{ title: text.formActionTitle, callback: formCallback }}
        label={text.formTitle}
        validationError={text.formValidationErrorMessage}
        inputPlaceholder={text.formInputPlaceholder}
      />
    ),
    [decodeVin, getText, formCallback]
  );

  const suitableHistory = useMemo(
    () =>
      decodeHistory
        .map((item, index) => ({
          of: item.of,
          id: index,
          action: {
            title: text.historyActionTitle,
            callback: () => selectHistoryItem(item),
          },
        }))
        .reverse() || [],
    [decodeHistory, selectedHistoryItem, selectHistoryItem, text]
  );

  const historyList = useMemo(
    () => (
      <HistoryList
        data={suitableHistory}
        title={text.historyListTitle}
        activeItem={{ id: decodeHistory.indexOf(selectedHistoryItem) }}
        emptyMessage={text.historyListEmptyMessage}
      />
    ),
    [decodeHistory, text, selectedHistoryItem]
  );

  const variablesPageLink = useMemo(
    () => (
      <Link to={VARIABLES_ROUTE} className='vin-page__link-to-variables-page'>
        {text.variablesPageLinkTitle}
      </Link>
    ),
    [text]
  );

  const suitableVariables = useMemo(() => {
    // API may return duplicated data, it needs filtering
    const unique =
      selectedHistoryItem?.result?.Results?.reduce((acc, item) => {
        if (item?.Variable && item?.Value) {
          const { Value, Variable, VariableId } = item;
          acc.set(VariableId, {
            name: Variable,
            value: Value,
            id: VariableId,
            link: {
              title: text.linkTitle,
              url: `${VARIABLES_ROUTE}/${VariableId}`,
            },
          });
        }
        return acc;
      }, new Map()).values() || [];
    return [...unique];
  }, [selectedHistoryItem, text]);

  const variableListTitle = useMemo(() => selectedHistoryItem?.result?.Message, [
    selectedHistoryItem,
  ]);

  const variableList = useMemo(
    () => <VariableList data={suitableVariables} title={variableListTitle} />,
    [suitableVariables, variableListTitle]
  );

  const loader = useMemo(() => <Loader centered />, []);

  return (
    <main className='vin-page__container'>
      {header}
      <section className='vin-page__content'>
        <div className='vin-page__actions'>
          {form}
          <div className='vin-page__actions_navigation'>
            {historyList}
            {variablesPageLink}
          </div>
        </div>
        {isLoading ? loader : variableList}
      </section>
    </main>
  );
};
