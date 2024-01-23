import { combineReducers, configureStore } from "@reduxjs/toolkit";
import photo from './photo';
import token from './token';
import user from './user';
import feed from './feed';

// const middleware = (getDefaultMiddleware) => getDefaultMiddleware()

const reducer = combineReducers({ photo, token, user, feed })
const store = configureStore({ reducer })

export default store;