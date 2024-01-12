import { combineReducers, configureStore } from '@reduxjs/toolkit';
import login from './login'
import localStorage from './middleware/localStorage';

const reducer = combineReducers({ login });

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorage)

const store = configureStore({ reducer, middleware });

export default store;