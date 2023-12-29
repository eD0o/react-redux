import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'date',
  initialState: {
    formData:{}
  },
  reducers: {
    addDates(state, action) {
      state.formData = action.payload
    }
  }
})

export const { addDates } = slice.actions;

export default slice.reducer;