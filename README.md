# 4 - React Redux

## 4.1 - Introduction

React Redux is a library that provides a set of bindings between React and Redux. It **allows React components to interact with the Redux store and access or update the application state**.

Installation:

```js
npm install redux react-redux
```

### 4.1.1 - Provider

- Component that wraps your entire React app.
- Supplies the Redux store to all components.

```js
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 4.1.2 - useDispatch

- Hook to dispatch actions to the Redux store.
- Obtains the dispatch function.

```js
import { useDispatch } from "react-redux";

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "MY_ACTION" });
  };

  return <button onClick={handleClick}>Dispatch Action</button>;
};
```

### 4.1.3 - useSelector

- Hook to extract data from the Redux store.
- Takes a selector function to choose specific parts of the global state.

```js
import { useSelector } from "react-redux";

const DisplayComponent = () => {
  const counter = useSelector((state) => state.counter);

  return <p>Counter Value: {counter}</p>;
};
```

tenho que ver se com o npx normal dá pra copiar e colar deboa um exemplo novo, vai ser muito melhor

## 4.2 - Connect

React Redux is a library that provides a set of bindings between React and Redux. It **allows React components to interact with the Redux store and access or update the application state**.

Installation:

```js
npm install redux react-redux
```

## 4.2.1 - mapStateToProps x mapDisptachToProps

Before hooks, **it was needed to connect** Redux to the component to use state/dispatch.

The **difference between using connect or hooks is not just syntactical**. Currently, there is also a technical difference in the implementation of how Redux updates components based on state change and also state comparison.

- **connect is generally used with class components**, while **hooks are more suitable for functional components**.

- **connect allows for more detailed and fine-grained configuration with mapStateToProps and mapDispatchToProps**, while **hooks are more concise** and directly used in the body of the functional component.

- Choosing between them often depends on personal preference and the team's coding style. Hooks have been a popular option since they were introduced in React, but the **choice can depend on the specific needs of the project and the team's history**.

mapsStateToProps:

```js
import React from "react";
import { connect } from "react-redux";

const App = ({ counter }) => {
  return (
    <div>
      <h1>Total: {counter}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { counter: state };
};

// Curried function, connect() returns a function that
// must be used to pass the Component as an argument
export default connect(mapStateToProps)(App);
```

mapDisptachToProps:

```js
//ActionCreator
const increment = () => ({ type: "INCREMENT" });

// There's no need to dispatch
const App = ({ counter, increment }) => {
  return (
    <div>
      <h1>Total: {counter}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { counter: state };
};

// It's just an object with a list of action creators
const mapDispatchToProps = {
  increase,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

## 4.3 - Redux Toolkit

The Redux team identified that much of the code created to write Redux is always the same thing. For this **they created another package** (which they advise you to use), **where much of the repetition** such as creating constants, action creators, configuring devtools, immer, redux-thunk and others **are already done for you**.

The toolkit **can be used without React**. When installing it, it is not necessary to install redux, just react-redux.

Installation:

```js
npm install @reduxjs/toolkit
```

### 4.3.1 - configureStore

configureStore automatically configures middleware such as redux-thunk and also devtools.

```js
// ~~ configureStore.js
// instead of createStore, import configureStore
import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";

// In it pass a configuration object that must
// contain the reducer property
const store = configureStore({ reducer: counter });

export default store;
```

```js
// ~~ index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/configureStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### 4.3.2 - createAction

createAction makes it easy to create actions and constants with a single function.

```js
// ~~ counter.js
import { createAction } from "@reduxjs/toolkit";

export const increment = createAction("INCREMENT");
export const decrement = createAction("DECREMENT");

function counter(state = 0, action) {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    default:
      return state;
  }
}

export default counter;
```

```js
// ~~ App.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// It's possible to pass a payload in increment;
import { increment } from './store/counter';

const App = () => {
   const state = useSelector((state) => state);
   const dispatch = useDispatch();
   return (
     <div>
       <h1>Total: {state}</h1>
       <button onClick={() => dispatch(increment())}>Increment</button>
     </div>
   );
};

export defaultApp;
```

### 4.3.3 - createSlice

createSlice will **create the reducer and actions using a single function**. It will also define a namespace for the actions and **automatically configure the immer**, thus **allowing state mutation within the reducer**.

```js
import { createSlice } from "@reduxjs/toolkit";

// Receives a name, initial state and each reducer action
const slice = createSlice({
  name: "counter",
  initialState: {
    total: 0,
  },
  reducers: {
    increment(state) {
      state.total++;
    },
    decrement(state) {
      state.total--;
    },
  },
});

// Export the actions
export const { increment, decrement } = slice.actions;
export default slice.reducer;
```

```js
// It is also possible to use reducers in the traditional way, without state mutation, just need to have a return for the actions
const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment(state) {
      return state + 1;
    },
    decrement(state) {
      return state - 1;
    },
  },
});
```

### 4.3.4 - combineReducers

There are specific cases where you may still need combineReducers. This usually occurs **when you have different "slices" of state that are managed by separate reducers, and you want to combine these slices into a single global state**. If you are using multiple state slices and each slice is managed by a separate reducer, you can use combineReducers to **compose the global state**.

Let's consider an example where in two different createSlice:

```js
// counter.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

```js
// user.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", age: 0 },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

export const { setName, setAge } = userSlice.actions;
export default userSlice.reducer;
```

Now, if you want to **combine these two reducers into a single reducer** to create the store, you can use combineReducers:

```js
// rootReducer.js
import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export default rootReducer;
```

In this example, **combineReducers is used to compose the counter and user reducers into a single reducer called rootReducer**. This rootReducer can be used to configure the store.

### 4.3.4 - getDefaultMiddleware

It's a function provided by the Redux Toolkit that **returns the default set of middlewares that are frequently used in Redux** applications. These middlewares are configured appropriately to **work well with best practices** when using the Redux Toolkit.

The **standard set** of middleware includes:

thunk: Allows the creation of **action creators that return asynchronous functions**, which is useful for performing **asynchronous operations, such as API calls**, within Redux actions.

immutableStateInvariant: Checks that state **changes are not made directly to the Redux state**. This helps **ensure that state is handled in an immutable manner**, which is a best practice in Redux.

serializableCheck: **Checks whether actions and state are serializable**, which is important for ensuring consistency when using tools like the Redux DevTools extension.

batch: **Groups multiple dispatches of actions into a single state update**, which can improve performance by reducing the number of re-renders.

To use custom ones:

```js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import counter from "./counter";
import modal from "./modal";

const reducer = combineReducers({ counter, modal });

// There are middlewares already configured by default in the store to add a new one, we need to pull the ones that already exist and destructure them within an array.
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger);

const store = configureStore({ reducer, middleware });

export default store;
```

## 4.4 - Async

Redux **Thunk is already configured automatically through the Toolkit**. We can define the asynchronous action the **same way we defined it without React, outside the slice**.

### 4.4.1 - Multiple Fetch

The logic is the same for different requests, only modifying the arguments of the fetch function. But it's better to use **createAsyncSlice** to handle many fetchs.

```js
// Login.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchError(state, action) {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchToken = (user) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(
      "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    return dispatch(fetchSuccess(data));
  } catch (error) {
    return dispatch(fetchError(error.message));
  }
};

export default slice.reducer;
```

## 4.5 - createAsyncSlice

Every time we identify a **pattern being repeated, there is an opportunity to optimize** the code through a function. (This function was created by the course author.)

```js
// import createSlice
import { createSlice } from "@reduxjs/toolkit";

/**
 * Creates a slice with an asynchronous function (js docs)
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */
const createAsyncSlice = (config) => {
  // create a slice
  const slice = createSlice({
    // define a specific name for the slice
    name: config.name,
    // the initial state has specific properties
    // but we can add new ones / write over existing ones
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
      // The spread operator (...) is used here to merge properties from the 'config.initialState' object into the 'initialState' object.
      // Essentially, this operation combines the properties of two objects to create a new object that includes all properties from both sources.
      // If 'config.initialState' has additional properties beyond 'loading', 'data', and 'error', those properties will also be included in the resulting object.
      // This approach is a concise way to extend or override default properties while maintaining flexibility and modularity in the code.
    },
    // list of default reducers
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      // new reducers if necessary
      ...config.reducers,
    },
  });

  // destructuring of actions
  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
  // asynchronous action (thunk), receives a payload
  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      // config.fetchConfig is a method that returns
      // the fetch url and options
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      return dispatch(fetchSuccess(data));
    } catch (error) {
      return dispatch(fetchError(error.message));
    }
  };

  // the function returns the slice properties and the asynchronous action
  return { ...slice, asyncAction };
};

export default createAsyncSlice;
```

## 4.5.1 - JSDoc

JSDoc is a standard for adding **documentation annotations to JavaScript** code, allowing you to describe the **purpose, parameters, return types**, and other information about functions and methods.

Annotations start with _/** and end with */. Within this block, you **can add tags like @param to describe parameters, @return to describe the return value, and other specific** tags to document different aspects of the code.

It also helps a lot to write code because of the IDE autocomplete. 

```js
/**
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */
const createAsyncSlice = (config) => {
  ...
}
```

(LATER:)

- CREATE A BOILERPLATE
- DO PREVIOUS CHALLENGES
