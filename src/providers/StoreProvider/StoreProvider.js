/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { StoreContext } from 'Contexts';

const StoreProviderBase = (props) => (
  <StoreContext.Provider value={{ getFromStore: (name) => props[name] }}>
    {props.children}
  </StoreContext.Provider>
);

const mapStateToProps = ({ dataReducer }) => ({ dataReducer });

const mapDispatchToProps = (dispatch) => ({
  updatePreferences: (body) => dispatch(((val) => val)(body)),
});

export const StoreProvider = connect(mapStateToProps, mapDispatchToProps)(StoreProviderBase);
