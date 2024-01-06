# 5 - More Redux

## 5.1 - Where to use

- Global State goes to Redux

- Local State may or may not go to Redux

- Avoid placing local states that change frequently (Form status, screen size, scroll position, etc).

## 5.2 - Forms

Form field state will **generally be managed locally**. However, we **can dispatch the state to Redux if it is necessary for us to use it globally**.

We **can also send all the form data** to the store.

Check the example 050201

## 5.3 - Cache

We can create an internal state that controls whether an asynchronous action should be dispatched or not, based on the time in which it was dispatched.

Check the example 050302

## 5.4 - Selector

The selector is a **function that we can use directly in useSelector to return exactly the data from the store that we need**. We use a selector when we need to select **specific data without the need to modify the state data**.

```js
export const getOverFiveKilos = (state) => {
  const { data } = state.photos;
  const overFiveKg = data?.filter(({ peso }) => peso >= 5);
  const transformPound = overFiveKg?.map((photo) => ({
    ...photo,
    //converting from kg to pounds
    peso: Math.floor(photo.peso * 2.2),
  }));
  return transformPound;
};
```

```js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "./store/photos";
import { getOverFiveKilos } from "./store/photos";

const Photos = () => {
  // general way to use the state
  // const {data} = useSelector((state) => state.photos);

  //new way to use specific data from the state without modifying it
  const data = useSelector(getOverFiveKilos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (!data) return null;

  return (
    <>
      <p>
        {data.map((photo) => (
          //It'll already change the number value but not the state itself.
          <li key={photo.id}>
            {photo.title} - {photo.peso}
          </li>
        ))}
      </p>
    </>
  );
};

export default Photos;
```

## 5.5 - Filters

Using selectors, we can **filter the data in our store without modifying** the initial values.

Check the 050502_example_part2 to see more details.

## 5.6 - Summary

### 5.6.1 - Installation

```js
npx create-react-app nameapp
```

```js
npm install redux react-redux @reduxjs/toolkit
```

### 5.6.2 - configureStore

```js
// /store/configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// minimum reducer for testing
const counter = () => 0;

const reducer = combineReducers({ counter });
const store = configureStore({ reducer });

export default store;
```

### 5.6.3 - Provider

Add the store to the application using the react-redux Provider.

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

### 5.6.4 - Reducer

Add the store to the application using the react-redux Provider.

```js
// store/counter.js
import { createSlice } from "@reduxjs/toolkit";

// If the initialState is not an Object or Array,
// it is necessary to return the state without mutating it
const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    reduce: (state) => state - 1,
  },
});

export const { increment, decrement } = slice.actions;
export default slice.reducer;
```

```js
//store/configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter from "./contador";

const reducer = combineReducers({ counter });
const store = configureStore({ reducer });

export default store;
```

### 5.6.5 - useDispatch and useSelector

Use the store created within a component using useSelector to select the state and useDispatch to dispatch actions to the reducer.

```js
// Counter.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, reduce } from "./store/counter";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(reduce())}>-</button>
      <p>{counter}</p>
    </div>
  );
};

export default Counter;
```

### 5.6.6 - Middleware (optional)

Create middleware to interfere with all actions that are dispatched.

```js
// store/middleware/logger.js
const logger = (store) => (next) => (action) => {
  const result = next(action);
  console.log(result);
  return result;
};

export default logger;
```

```js
// store/configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import logger from "./middleware/logger";

const middleware = (getDefauultMiddleware) =>
  getDefauultMiddleware().concat(logger);
const reducer = combineReducers({ counter });
const store = configureStore({ reducer, middleware });

export default store;
```

### 5.6.7 - Async with Thunk

<details>
<summary>head 1</summary>

```js
// store/fotos.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "fotos",
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

export default slice.reducer;

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchFotos = (page) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=9&_user=0`,
      { cache: "no-store" }
    );
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
```
</details>

### 5.6.8 - Selectors

```js

```

(WHERE IM TALKING ABOUT CHECK, TRY TO INSERT MORE PRINTSCREEN)
