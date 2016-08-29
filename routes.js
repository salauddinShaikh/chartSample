import {Route, Router, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import Home from './components/home';
import AdvanceChart from './components/advanceChart';
import StockChart from './components/stockChart';
import LineChart from './components/lineChart';
import BarChart from './components/barChart';
import PieChart from './components/pieChart';
import AreaChart from './components/areaChart';
import DynamicChart from './components/dynamicChart';
import MasterContainer from './components/master.container';
import Login from './components/login/login.container';


export default (
  <Route path='/' component={MasterContainer} >
    <Route path='login' component={Login} />
    <Route onEnter={requireAuth}>
      <Route path='home' component={Home} />
      <Route path='advanceChart' component={AdvanceChart} />
      <Route path='stockChart' component={StockChart} />
      <Route path='lineChart' component={LineChart} />
      <Route path='barChart' component={BarChart} />
      <Route path='pieChart' component={PieChart} />
      <Route path='areaChart' component={AreaChart} />
      <Route path='dynamicChart' component={DynamicChart} />
      <IndexRoute component={Home} />
    </Route>
  </Route>
);

function requireAuth(nextState, replace) {
  if (localStorage.getItem('userInfo') === null) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

