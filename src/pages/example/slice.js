import { createSlice } from "@reduxjs/toolkit";
const initState = {
  cityList: [],
  weather: null,
  quality: null,
};
export const slice = createSlice({
  name: "weather",
  initState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = slice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export default slice.reducer;
