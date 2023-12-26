import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import logger from './middleware/logger';
import counter from './counter';
import modal from './modal';
import login from './login'
import localStorage from './middleware/localStorage';

const reducer = combineReducers({ counter, modal, login });

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorage)

const store = configureStore({ reducer, middleware });

export default store;