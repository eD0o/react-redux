# 3 - Middlware

Middleware in Redux plays an important role in **expanding Redux's capabilities, making it more flexible and capable of handling diverse tasks** beyond simply updating the application state in response to synchronous actions.

## 3.1 - Currying

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
