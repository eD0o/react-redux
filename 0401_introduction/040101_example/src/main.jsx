import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.scss'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

function reducer(state = 0, action){
  switch (action.type){
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
