import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counter from './counter';
import photos from './photos';
import logger from './middleware/logger'

const reducer = combineReducers({ counter, photos });

const middleware = (getDefauultMiddleware) => getDefauultMiddleware().concat(logger);

const store = configureStore({ reducer, middleware });

export default store;