# 3 - Middlware

## 3.1 - Currying

Currying in JavaScript transforms a function with **multiple arguments into a nested series of functions, each taking a single argument**

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

So, in Redux is usually used for action creators:

```js
import { ADD_TASK } from "./actionTypes";

export const addTask = (taskName) => (dispatch) => {
  dispatch({ type: ADD_TASK, payload: taskName });
};
```
