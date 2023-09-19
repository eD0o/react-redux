# 1 - Install Redux

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

# 2 - Fundamentals

## 2.1 - Store

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

## 2.2 - Action

To update the state, we send an action through the store using the dispatch method. An action is always **an object that contains the type and a possible payload value if necessary**.

In the reducer we **check the type of action sent and return the new state** from that.

### 2.2.1 - Constants

The action's type is always a string that identifies it. **As it is a string, the user may end up making a typing error**, thus introducing a BUG to the application.

To avoid this problem, it is common to **create constants for the names of each action** that we have.

### 2.2.2 - Action Creator

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

## 2.3 - Subscribe/Unsubscribe

### 2.3.1 - Subscribe

When the state is modified through an action, **it is necessary to render it again on the screen**.

The store has a subscribe method that **will activate the function that is passed as its argument, every time an action is dispatched** via dispatch.

It's usually **used with an external render function and activate that whenever the dispatch is triggered**.

### 2.3.2 - Unsubscribe

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

### 2.4 - Reducer

### 2.4.1 - Switch Case

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

### 2.4.2 - combineReducers

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

## 2.5 - Pure Function

**One of the most important rules** of Redux is to always use Pure Functions.

Pure functions **always return the same value given the same argument and produce NO SIDE EFFECTS\*.**

Returning the same value means that the function's internal calculations **cannot depend on random numbers, time, date and other data that might change** in the future.

_\*Side effects are those that impact objects/elements that do not belong to the function. Example: fetch, setTimeout, manipulate dom, modify external objects/arrays and others._

So, if it's necessary to change the component somehow, **don't do it inside the reducer/pure function, but change it in the component itself.**

### 2.5.1 - Redux DevTools

One of the main advantages of using Redux is the use of its **browser extension to debug state changes.**

> [Install on Chrome:](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) / [Configure in store:](https://github.com/zalmoxisus/redux-devtools-extension)

So if you have the extension installed, the next time you want to see the states better in redux, declare the store like below:

```js
const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

Then, will be much easier to see the changes of the states:
![](https://i.imgur.com/NG06VgX.png)

One of the problems with side effects is that **they break devtool functionality like Time Travel**. Again, any side effect must be in the render/component.

A correct example:

```js
function modifyWidth(payload) {
  return { type: "MODIFY_WIDTH", payload };
}

function reducer(state = 0, action) {
  switch (action.type) {
    case "MODIFY_WIDTH":
      return action.payload;
    default:
      return state;
  }
}

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function render() {
  const box = document.querySelector("#box");
  box.style.width = store.getState() + "px";
}

store.subscribe(render);
store.dispatch(modifyWidth(100));
store.dispatch(modifyWidth(20));
store.dispatch(modifyWidth(30));
store.dispatch(modifyWidth(50));

console.log(store.getState()); //output -> 50 and devtools working normally
```

## 2.6 - Immutability

The **reducer function must always return a new state when it is modified**. **Never modify the state directly** (it must be immutable). The concept of mutability mainly interferes with how we deal with objects and arrays.

### 2.6.1 - Desestructuring

```js
function modifyName(payload) {
  return { type: "MODIFY_NAME", payload };
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case "MODIFY_NAME":
      //Even being changed, Redux will identify the state as the same all the times.
      //It's not recommended to change the state directly like that, you must create a new object.
      state.name = action.payload; // -> WRONG
      return state;

      //Doing this, you will create a spread operator to copy the object and just return the value (a new state), and not the state changed.
      return { ...state, name: action.payload }; // -> RIGHT
    //Destructuring will copy the content of the array, but won't be equal.
    //So even if the values are identical, the comparison in a if will return false because the two arrays have different memory references.
    default:
      return state;
  }
}

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch(modifyName("Rúbens"));
store.dispatch(modifyName("João"));
store.dispatch(modifyName("Matias"));
```

### 2.6.2 - Arrays and their effects

Also, here comes a list with **methods that can mutate or not an array/state**, so be careful to use some inside the reducer:

```js
// Some methods that change the array:
array.copyWithin();
array.fill();
array.pop();
array.push();
array.reverse();
array.shift();
array.sort();
array.splice();
array.unshift();

// Some methods that create a new array:
array.concat();
array.filter();
array.map();
array.reduce();
array.flat();
array.join();
```

### 2.6.3 - Immer

Immer is a package that provides us with **a function, in which we can use all the methods that mutate arrays or objects, without worrying about the issue of immutability**. Because the function of the immer **will always produce a new object/array**.

The same is **part of the Redux Toolkit package**, which is a package with several tools that will make it easier to write Redux code.

```js
const obj1 = {
  name: "Eduardo",
  age: 23,
};

const obj2 = immer.produce(obj1, (draft) => {
  draft.age = 24;
});

console.log("obj1: ", obj1, "obj2: ", obj2); // output -> obj1:  {name: 'Eduardo', age: 23} obj2:  {name: 'Eduardo', age: 24}
```

- The first argument is the original object you want to modify(obj1).
- The second argument is a function that receives the draft of this object and allows you to make the necessary modifications.

The term "draft" refers to a **mutable copy of an immutable object**. In other words, it's a temporary object that you can make changes to as if you were mutating the original object, but behind the scenes, **Immer ensures that all changes are registered without actually modifying the original object**.

### 2.6.4 - Immer and Reducer

We can wrap the complete reducer function inside the Immer produce.

- No default or return required
- The break locks the switch statement
- The initialState will be passed as second argument.

```js
const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case "MODIFY_NAME":
      state.name = action.payload;
      break;
  }
}, initalState);
```

Without the immer, the same side effect issue with _state.name = action.payload;_ would happen. So, if you want to avoid to desestructuring and write lots of spread operators, Immer is a great decision.

## 2.7 - Organization (ducks)

There are different ways to organize Redux files. In the course we will use one inspired by the **ducks pattern**, where we will keep the **actions and the related reducer in the same file**.

store/configureStore.js: where we settle the store using the reducer

```js
import counter from "./counter.js";

const reducer = Redux.combineReducers({ counter });

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

store/counter.js: file where is the reducer function and its action types/creators 

```js
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const initialState = 0;

const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case INCREMENT:
      state + 1;
      break;
  }
}, initialState);

export default reducer;
```

index.html: where we may import the files and use them with subscribe and dispatch.

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redux</title>
    <script src="./redux.min.js"></script>
    <script src="./immer.min.js"></script>
  </head>

  <body>
    <div></div>

    <script type="module">
      import store from "./store/configureStore.js";
      import { increment } from "./store/counter.js";

      store.subscribe(() => {
        console.log("it worked!");
      });

      store.dispatch(increment());
    </script>
  </body>
</html>
```
