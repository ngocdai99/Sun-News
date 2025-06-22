// reduxStore.ts
import {configureStore} from '@reduxjs/toolkit';
import exploreSlice from './explore/exploreSlice';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './rootSaga';
import homeSlice from './home/homeSlice';
import profileSlice from './profile/profileSlice';

const sagaMiddleWare = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: {
    exploreData: exploreSlice.reducer,
    homeData: homeSlice.reducer,
    profileData: profileSlice.reducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({thunk: false}).concat(sagaMiddleWare),
});
sagaMiddleWare.run(rootSaga);

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxStoreDispatch = typeof reduxStore.dispatch;
