import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    open: () => true,
    close: () => false
  }
})

export const { open, close } = slice.actions
export default slice.reducer