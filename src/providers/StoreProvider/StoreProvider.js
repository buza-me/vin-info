/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { StoreContext } from 'Contexts';
import {
  setDecodeHistory,
  setSelectedDecodeResults,
  setVariables,
  setSelectedVariable,
  decodeVinAsync,
  getVariablesAsync,
  getSelectedVariableAsync,
} from 'Store/actions';

const StoreProviderBase = (props) => (
  <StoreContext.Provider value={{ getFromStore: (name) => props[name] }}>
    {props.children}
  </StoreContext.Provider>
);

const mapStateToProps = ({ dataReducer }) => ({
  decodeHistory: dataReducer.decodeHistory,
  selectedDecodeResults: dataReducer.selectedDecodeResults,
  variables: dataReducer.variables,
  selectedVariable: dataReducer.selectedVariable,
});

const mapDispatchToProps = (dispatch) => {
  const dFactory = (action) => (payload) => dispatch(action(payload));
  return {
    setDecodeHistory: dFactory(setDecodeHistory),
    setSelectedDecodeResults: dFactory(setSelectedDecodeResults),
    setVariables: dFactory(setVariables),
    setSelectedVariable: dFactory(setSelectedVariable),
    decodeVinAsync: dFactory(decodeVinAsync),
    getVariablesAsync: dFactory(getVariablesAsync),
    getSelectedVariableAsync: dFactory(getSelectedVariableAsync),
  };
};

export const StoreProvider = connect(mapStateToProps, mapDispatchToProps)(StoreProviderBase);
