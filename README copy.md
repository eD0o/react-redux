# 4 - React Redux

Middleware in Redux plays an important role in **expanding Redux's capabilities, making it more flexible and capable of handling diverse tasks** beyond simply updating the application state in response to synchronous actions.

## 4.1 - Introduction

Currying in JavaScript transforms a function with **multiple arguments into a nested series of functions, each taking a single argument**, and it's well used for middlewares.

- Reuse Code: Create specialized or partially applied functions for **code reuse and modularity**.
- Increase Flexibility: Build versatile functions that **adapt to different contexts**.
- Compose Functions: Easily create function pipelines for **data transformation**.
- Enhance Readability: Make **code clearer by handling one argument at a time**.
- Memoization: Use currying for **caching results and improving performance**.
- Asynchronous Programming: **Simplify error** handling and retry logic in async tasks.

> Important: However, remember that currying **isn't always necessary; use it when it enhances code modularity, readability, and composability based on your project's specific needs.**

```js
//without currying:
function sum(a, b, c) {
  return a + b + c;
}
sum(1, 2, 3); // 6
```

```js
//with currying:
function sum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
console.log(sum(1)(2)(3)); // 6

//also the same with currying:
const sum = (a) => (b) => (c) => {
  return a + b + c;
};
console.log(sum(1)(2)(3)); // 6
```

So, in Redux is usually used for action creators and middlewares:

```js
import { ADD_TASK } from "./actionTypes";

export const addTask = (taskName) => (dispatch) => {
  dispatch({ type: ADD_TASK, payload: taskName });
};
```

## 3.2 - applyMiddleware / Compose

Middleware occurs between the moment the **action is triggered and before it reaches the reducer. It is applied via the Redux.applyMiddleware function**

The **second or third argument to createStore is considered an enhancer**. Just like **middleware, devtools' function is also a store enhancer**. To pass **more than one, we must use the Redux.compose()** function

```js
// // Destructuring Redux functions (not necessary, we can use Redux.compose)
const { compose, applyMiddleware } = Redux;
// Checks if __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ exists, if not using pure compose.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Apply Middleware with compose
const enhancer = composeEnhancers(applyMiddleware(logger));
// Use devTools + middleware as a store enhancer
const store = Redux.createStore(reducer, enhancer);
```

> Example:

```js
//currying structure
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("ACTION", action);
  // store.getState before next(action), returns the current state
  console.log("PREV_STATE", store.getState());
  const result = next(action);
  // store.getState after next(action), returns the later state
  console.log("NEW_STATE", store.getState());
  console.groupEnd();
  // we always have to return the result of next(action)
  return result;
};

const action = store.dispatch({ type: "INCREMENT" });
console.log(action); // {type: 'INCREMENT'}, if we don't return anything in the Middleware, here it will be undefined

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(logger));
```

## 3.3 - Redux Thunk

Thunk comes from "Func", that is the abreviation from Function.

It's possible and usually used by installing it by npm install redux-thunk, but we'll see how it usually works manually.

As said before, the reducer must be a **pure function, with no side effects. That's why we don't make http requests directly to it**.

The function below works perfectly. But **it's not recommended** for two reasons: the first is because **it has a function that triggers actions that will modify the state**. By default, **only actions via dispatch should modify the state**. The second reason is the **need to always pass dispatch as its argument**.

```js
// wrong
function reducer(state = null, action) {
  switch (action.type) {
    case "FETCH_DATA":
      // fetch is a side effect
      const data = fetch("https://dogsapi.origamid.dev/json/api/photo").then(
        (r) => r.json()
      );
      // data is a Promise
      return data;
    default:
      return state;
  }
}

//it's always necessary to use store.dispatch, if you forget, you'll have an error.
store.dispatch({ type: "FETCH_DATA" });
```

So, it's viable to **use a middleware to handle the obligation to always send objects via dispatch**. In the middleware **we can identify the action**, and check if it is a function. **If it is a function, we can activate it**.

Thunk also avoids this -> Uncaught Error: Actions must be plain objects. Use custom middleware for async actions.

```js
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  console.log(action);
  return next(action);
};

const { applyMiddleware, compose } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = Redux.createStore(reducer, enhancer);

function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_STARTED" });
      const data = await fetch(url).then((r) => r.json());
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
}

store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo"));
```

## 3.4 - localStorage

**Writing something to localStorage is a side-effect**, as is DOM manipulation. For this it's possible to create a middleware that will handle the situation.

Simple example:

```js
const localStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (action.localStorage !== undefined) {
    console.log(action);
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload)
    ); //JSON.stringify to store the array as a string
  }
  return result;
};

const localStorage = (store) => next => action => {
  const result = next(action)
  if (action.localStorage !== undefined) {
    console.log(action)
    window.localStorage.setItem(action.localStorage, JSON.stringify(action.payload)) //JSON.stringify to store the array as a string
  }
  return result
}

const { applyMiddleware, compose } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage)); //Don't forget to use it in the composeEnhancers
const store = Redux.createStore(reducer, enhancer)

function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_STARTED' })
      const data = await fetch(url).then(r => r.json())
      dispatch({ type: 'FETCH_SUCCESS', payload: data, localStorage: 'data' }) //Also configuring it in the dispatch
      console.log(data)
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message })
    }
  }
}
```

![](https://i.imgur.com/c2OsUry.png)


But **to avoid JSON structure errors** and to always reinsert values on localStorage, you can do that: 

```js
function getLocalStorage(key, initial) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return initial;
  }
}

const initialState = {
  loading: false,
  data: getLocalStorage('data', null),
  error: null
}

//This part is just to avoid to refetch something that is already stored in the localStorage.
const state = store.getState();

if (state.data === null){
  store.dispatch(fetchUrl('https://dogsapi.origamid.dev/json/api/photo'))
}
```