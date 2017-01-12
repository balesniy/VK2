import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers'
import App from './App';

const store = createStore(rootReducer, {}, applyMiddleware(promiseMiddleware, thunk, createLogger()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
