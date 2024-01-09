const COMPLETE_CLASS = 'class/COMPLETE_CLASS';
const COMPLETE_COURSE = 'class/COMPLETE_COURSE';
const RESET_COURSE = 'class/RESET_COURSE';

export const completeClass = () => ({ type: COMPLETE_CLASS });
export const completeCourse = () => ({ type: COMPLETE_COURSE });
export const resetCourse = () => ({ type: RESET_COURSE });

const initialState = [
  {
    id: 1,
    name: "Typescript",
    complete: false
  },
  {
    id: 2,
    name: "React",
    complete: false
  },
  {
    id: 3,
    name: "Redux",
    complete: false
  },
]

const reducer = immer.produce((state, action) => {
  switch (action.type) {
    case COMPLETE_CLASS:
      const index = state.findIndex((x) => x.id === action.payload);
      if (!isNaN(index) && state[index]) state[index].complete = true;
      break;
    case COMPLETE_COURSE:
      state.forEach((classes) => classes.complete = true);
      break;
    case RESET_COURSE:
      state.forEach((classes) => classes.complete = false)
      break;
  }
}, initialState)

export default reducer;