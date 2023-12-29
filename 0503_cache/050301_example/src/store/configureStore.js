import { combineReducers, configureStore } from '@reduxjs/toolkit';
import date from './date'

const reducer = combineReducers({ date });
const store = configureStore({ reducer: date });

export default store;