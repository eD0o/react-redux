import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'photos',
  initialState: {
    loading: false,
    data: null,
    error: null
  },
  reducers: {
    fetchStarted(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  }
})

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchPhotos = (page = 1) => async (dispatch) => {
  try {
    dispatch(fetchStarted())
    const response = await fetch(
      `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=9&_user=0`,
      {
        cache: 'no-store'
      },);
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error.message))
  }
}

export const selectOverFiveYears = (state) => state.photos.data?.filter(({ idade }) => idade >= 5)

export default slice.reducer;