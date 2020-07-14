import weather from '../pages/weather/slice';
import { counterSlice, privilegeSlice } from './slice';

export default {
  weather,
  count: counterSlice.reducer,
  privilege: privilegeSlice.reducer,
};
