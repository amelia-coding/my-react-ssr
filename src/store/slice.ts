import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'count',
  initialState: 0,
  reducers: {
    decrease: (state) => {
      return state - 1;
    },
    increase: (state) => {
      return state + 1;
    },
  },
});

export const privilegeSlice = createSlice({
  name: 'privilege',
  initialState: [],
  reducers: {},
});

export const { decrease, increase } = counterSlice.actions;

export default {
  counterSlice,
  privilegeSlice,
};
