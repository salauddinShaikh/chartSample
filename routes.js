import {Route, Router, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import Home from './components/home';
import AdvanceChart from './components/advanceChart';
import StockChart from './components/stockChart';
import LineChart from './components/lineChart';
import BarChart from './components/barChart';
import PieChart from './components/pieChart';
import AreaChart from './components/areaChart';
import MasterContainer from './components/master.container';


export default(
      <Route path='/' component={MasterContainer} >
        <Route path='home' component={Home} />
        <Route path='advanceChart' component={AdvanceChart} />
        <Route path='stockChart' component={StockChart} />
        <Route path='lineChart' component={LineChart} />
        <Route path='barChart' component={BarChart} />
        <Route path='pieChart' component={PieChart} />
        <Route path='areaChart' component={AreaChart} />
        <IndexRoute component={Home} />
      </Route>
);

