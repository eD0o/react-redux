import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import modal from './modal'

const reducer = combineReducers({ counter, modal })

const store = configureStore({ reducer })

export default store