import {
  Action,
  configureStore,
  DeepPartial,
  EnhancedStore,
  getDefaultMiddleware,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import reducer from './reducers';

const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootDispacth = ThunkDispatch<RootState, unknown, Action<string>>;

export default function createStore(
  store: DeepPartial<RootState>,
): EnhancedStore<RootState, Action, any> {
  return configureStore({
    reducer: reducer,
    preloadedState: store,
    middleware: [...getDefaultMiddleware()],
  });
}
