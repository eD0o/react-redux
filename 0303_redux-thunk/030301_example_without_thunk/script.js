const initialState = {
  loading: false,
  data: null,
  error: null
}

//reducer respecting the immutability
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_STARTED':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return {
        //no need to destructuring because it's all declared
        data: action.paylod,
        loading: false,
        error: null
      }
    case 'FETCH_ERROR':
      return {
        data: null,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}


const { applyMiddleware, compose } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware());
const store = Redux.createStore(reducer, enhancer)

async function fetchUrl(dispatch, url) {
  try {
    dispatch({ type: 'FETCH_STARTED'})
    const data = await fetch(url).then(r => r.json())
    dispatch({ type: 'FETCH_SUCCESS', payload: data })
    console.log(data)
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message })
  }
}

fetchUrl(store.dispatch, 'https://dogsSapi.origamid.dev/json/api/photo')