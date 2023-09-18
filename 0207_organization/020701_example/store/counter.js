const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })

const initialState = 0

/**
 * wrong example
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return - 1
    default:
      return state
  }
}
*/

const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case INCREMENT:
      state + 1
      break;
  }
}, initialState);

export default reducer;