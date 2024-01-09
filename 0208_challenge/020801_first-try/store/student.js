//action creators
const INCREMENT_TIME = 'student/INCREMENT_TIME';
const DECREMENT_TIME = 'student/DECREMENT_TIME';
const CHANGE_EMAIL = 'student/CHANGE_EMAIL';

export const incrementTime = () => ({ type: INCREMENT_TIME });
export const decrementTime = () => ({ type: DECREMENT_TIME });
export const changeEmail = (email) => ({ type: CHANGE_EMAIL, payload: email });

const initialState = {
  name: 'Eduardo Benigno',
  email: 'eduardo.benigno15@gmail.com',
  remainingDays: 120
}

const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case INCREMENT_TIME:
      //using immer
      state.remainingDays++

      //if not using immer, would be like this:
      // return{...state, remainingDays: state.remainingDays + 1}
      break;
    case DECREMENT_TIME:
      state.remainingDays--
      break;
    case CHANGE_EMAIL:
      state.email = action.payload
      break;
  }
}, initialState)

export default reducer;