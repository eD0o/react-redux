import { combineReducers, configureStore } from "@reduxjs/toolkit";

const counter = () => 0

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()

const reducer = combineReducers({ counter })
const store = configureStore({ reducer, middleware })

export default store;