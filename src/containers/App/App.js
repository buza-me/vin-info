import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROOT_ROUTE, VARIABLES_ROUTE, VARIABLE_ROUTE } from 'Constants';
import { ErrorPage, VinPage, VariableListPage, VariableDetailsPage } from 'Pages';

export const App = () => (
  <section className='app__content-wrapper'>
    <Switch>
      <Route exact path={ROOT_ROUTE} component={VinPage} />
      <Route exact path={VARIABLES_ROUTE} component={VariableListPage} />
      <Route exact path={VARIABLE_ROUTE} component={VariableDetailsPage} />
      <Route path='*' component={ErrorPage} />
    </Switch>
  </section>
);
