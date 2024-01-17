import { combineReducers, configureStore } from "@reduxjs/toolkit";
import photo from './photo';

// const middleware = (getDefaultMiddleware) => getDefaultMiddleware()

const reducer = combineReducers({ photo })
const store = configureStore({ reducer })

export default store;