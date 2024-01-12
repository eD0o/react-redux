import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    sum: {
      reducer: (state, action) => state + action.payload,
      prepare: (payload) => ({ payload, meta: 'local' }),
    }
  }
})

export const { increment, decrement, sum } = slice.actions
export default slice.reducer;