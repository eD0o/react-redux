import { createAction } from '@reduxjs/toolkit'

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export default counter