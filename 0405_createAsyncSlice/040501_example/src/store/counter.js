import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'counter',
  initialState: {
    total: 0
  },
  reducers:{
    //changing the state directly, but knowing that immer will adapt to immutability automatically
    increment(state){
      state.total++
    },
    // Manual way to ensure immutability
    decrement(state) {
      return { ...state, total: state.total - 1 };
    },
  }
})

export const {increment, decrement} = slice.actions
export default slice.reducer;