# 0 - Install Redux

We can install via NPM by yarn/npm, if you are using it with webpack/similar, or directly via the script link in a raw html/js project:

> If you're coding a Vanilla JS project:

```js
  yarn add redux
```

> If you're coding a React project:

```js
  yarn add redux react-redux
```

In short, the "redux" package is the core state management library, while the "react-redux" package is a Redux extension for easier integration with React, making communication between Redux managed state and components React more convenient.

Or download the file directly:

> [redux.min.js](https://unpkg.com/redux@4.2.1/dist/redux.min.js)

```html
<script src="https://unpkg.com/redux@4.2.1/dist/redux.min.js"></script>
<script src="./pathtofile/redux.min.js"></script>
```

# 1 - Fundamentals

## 1.1 - Store

The Store in Redux is a single source of truth for the entire application's state. It is essentially **an object that holds the complete state tree of your application**. The state in the Store **represents the data** that drives your application's UI and determines how it behaves.

The **getState() method returns the current state** of the store.

```js
function reducer() {
  return {
    name: "Eduardo",
    id: 8,
  };
}

const store = Redux.createStore(reducer);
const state = store.getState();
console.log(state); // output -> same object as returned in reducer
```

> The term/functon reducer will be explained later.

## 1.2 - Action

To update the state, we send an action through the store using the dispatch method. An action is always **an object that contains the type and a possible payload value if necessary**.

In the reducer we **check the type of action sent and return the new state** from that.

### 1.2.1 - Constants

The action's type is always a string that identifies it. **As it is a string, the user may end up making a typing error**, thus introducing a BUG to the application.

To avoid this problem, it is common to **create constants for the names of each action** that we have.

### 1.2.2 - Action Creator

One more common practice to facilitate the use of actions is to create **functions that return the action object**. These are called Action Creators.

```js
const initialState = 10;

//constant
const INCREMENT = "INCREMENT";

//action creator
function sum(payload) {
  return { type: "SUM", payload };
}

function reducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    return state + 1;
  }

  if (action.type === "SUM") {
    return state + action.payload;
  }

  if (action.type === "decrement") {
    return state - 1;
  } else {
    return state;
  }
}

const store = Redux.createStore(reducer);

store.dispatch(increment());
store.dispatch(sum(25));
store.dispatch({ type: "decrement" }); // -> ALWAYS AVOID THIS

let state = store.getState();
console.log(state); // output -> 36
```

## 1.3 - Subscribe/Unsubscribe

### 1.3.1 - Subscribe

When the state is modified through an action, **it is necessary to render it again on the screen**.

The store has a subscribe method that **will activate the function that is passed as its argument, every time an action is dispatched** via dispatch.

It's usually **used with an external render function and activate that whenever the dispatch is triggered**.

### 1.3.2 - Unsubscribe

If, for some reason, you want **the function to stop being activated when a dispatch occurs**, you can use unsubscribe, which is the return from activating the subscribe method.

```js
function render() {
  const state = store.getState();
  const total = document.querySelector("#total");
  total.innerText = state;
}

render();

const unsubscribe = store.subscribe(render);
unsubscribe(); // Not being triggered anymore because of the unsubscribe's declaration

//It's valid to have multiple subscribes, and this one is working normally
store.subscribe(() => {
  console.log("Dispatch triggered and watched by the subscribe.");
});

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => store.dispatch(increment()));
```

### 1.4 - Reducer

### 1.4.1 - Switch Case

It is common to **use the switch statement inside the reducer instead of using if/else**. It serves only to **facilitate the reading and to avoid the repetition** of the action.type.

```js
function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default: //It's important to keep a default clause to use as an "else".
      return state;
  }
}
const store = Redux.createStore(reducer);
```

### 1.4.2 - combineReducers

We can **split the reducer code into different functions and combine them at the end**. It is worth remembering that in the end **the reducer will always be unique and every action dispatched will pass through all reducers**.

In short, use Redux.combineReducers() **whenever your application has multiple chunks of state** handled by different reducers. This **helps maintain code organization and modularity as your application grows in complexity**.

<details>
  <summary>Example</summary>

```js
const initialState = 0;

function counter(state = initialState, action) {
  switch (action.type) {
    case "SUM":
      return state + action.payload;
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
}

function modal(state = true, action) {
  switch (action.type) {
    case "OPEN":
      return true;
    case "CLOSE":
      return false;
    default:
      return state;
  }
}

const reducer = Redux.combineReducers({ counter, modal });

const store = Redux.createStore(reducer);

function render() {
  const { counter, modal } = store.getState();
  const total = document.querySelector("#total");
  total.innerText = counter; //It's important to iterate the state to the reducer you want to show, considering that now it's an object.
  if (modal) {
    total.style.display = "block";
  } else {
    total.style.display = "none";
  }
}

render();
store.subscribe(render);
```
> [More details about this example:](https://github.com/eD0o/react-redux/blob/02_basics/0204_reducer/020402_example_combine_reducers/index.html)

</details>
