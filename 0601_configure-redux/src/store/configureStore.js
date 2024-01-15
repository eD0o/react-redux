import {
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';

const counter = () => 0;

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(counter);

const reducer = combineReducers({ counter });
const store = configureStore({ reducer, middleware });

export default store;
