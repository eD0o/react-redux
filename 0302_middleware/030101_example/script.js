const initialState = {
  counter: 0
}

//reducer respecting the immutability
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}

const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('ACTION', action)
  console.log('PREV_STATE', store.getState())
  const result = next(action)
  console.log('STATE', store.getState())
  console.groupEnd()
  return result //always return the next(action)
}

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(logger));

const middleware = Redux.applyMiddleware(logger)

const store = Redux.createStore(reducer, middleware)

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'DECREMENT' })
const test = store.dispatch({ type: 'DECREMENT' })

console.log(test) 