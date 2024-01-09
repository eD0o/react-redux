import student from './student.js';
import classes from './classes.js';

const reducer = Redux.combineReducers({ student, classes });

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store;