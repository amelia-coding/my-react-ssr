import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@store/index';
import { fetchCityList, fetchQuality, fetchTemperature } from './service';

interface weatherState {
  cityList: Array<any>;
  weather: null;
  quality: null;
}

const initialState: weatherState = {
  cityList: [],
  weather: null,
  quality: null,
};
export const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateCityList: (state, action: PayloadAction<Array<any>>) => {
      return { ...state, cityList: action.payload };
    },
    updateWeather: (state, { payload }) => {
      return { ...state, weather: payload };
    },
    updateQuality: (state, { payload }) => {
      return { ...state, quality: payload };
    },
  },
});
export const { updateCityList, updateWeather, updateQuality } = slice.actions;

export const getCityList = (): AppThunk => async (dispatch) => {
  const data = await fetchCityList();
  dispatch(updateCityList(data));
};

export const fetchCityListAndTemperature = (city: string): AppThunk => async (dispatch) => {
  const data = await fetchCityList(city);
  const res = await fetchTemperature(data[0].location);
  dispatch(updateWeather(res.daily_forecast));
  dispatch(updateCityList(data));
};

export const fetchCityListAndQuality = (city: string): AppThunk => async (dispatch) => {
  const data = await fetchCityList(city);
  const res = await fetchQuality(data[0].location);
  dispatch(updateCityList(data));
  dispatch(updateQuality(res));
};

export default slice.reducer;
