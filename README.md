# 0 - Install Redux

We can install via NPM by yarn/npm, if you are using it with webpack/similar, or directly via the script link in a raw html/js project:

> If you're coding a Vanilla JS project:
```javascript
  yarn add redux
```
> If you're coding a React project:
```javascript
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

```javascript
function reducer() {
  return {
    name: 'Eduardo',
    id: 8,
  };
}

const store = Redux.createStore(reducer);
const state = store.getState();
console.log(state.name);
```
> The term/functon reducer will be explained later.

## 1.2 - Action

To update the state, we send an action through the store using the dispatch method. An action is always ==an object that contains the type and a payload value if necessary==.

<span style="background-color: #FFFF00">In the reducer we check the type of action sent and return the new state from that.</span>