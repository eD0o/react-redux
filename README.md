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