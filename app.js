import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Home from './components/home';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap.min.js';
import './node_modules/startbootstrap-sb-admin-2/bower_components/metisMenu/dist/metisMenu.min.css';
import './node_modules/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css';
import './node_modules/startbootstrap-sb-admin-2/bower_components/font-awesome/css/font-awesome.min.css';
import './node_modules/startbootstrap-sb-admin-2/bower_components/metisMenu/dist/metisMenu.min.js';
import './node_modules/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js';
import './styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'));