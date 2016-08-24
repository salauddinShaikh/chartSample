import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Home from './components/home';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './styles.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

var routes = (
  <Provider store={store}>
    <Home/>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));