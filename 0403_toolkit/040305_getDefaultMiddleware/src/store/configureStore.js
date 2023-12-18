import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import counter from './counter';
import modal from './modal';

const reducer = combineReducers({ counter, modal });

// There are middlewares already configured by default in the store to add a new one, we need to pull the ones that already exist and destructure them within an array.
const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({ reducer, middleware });

export default store;