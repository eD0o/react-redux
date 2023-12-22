import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import counter from './counter';
import modal from './modal';
import login from './login'

const reducer = combineReducers({ counter, modal, login });

// There are middlewares already configured by default in the store to add a new one, we need to pull the ones that already exist and destructure them within an array.
const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

const store = configureStore({ reducer, middleware });

export default store;