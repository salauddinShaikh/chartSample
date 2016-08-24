import {Route, Router, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import Home from './components/home';
import AdvanceChart from './components/advanceChart';
import MasterContainer from './components/master.container';

export default(
      <Route path='/' component={MasterContainer} >
        <Route path='home' component={Home} />
        <Route path='advanceChart' component={AdvanceChart} />
        <IndexRoute component={Home} />
      </Route>
);

