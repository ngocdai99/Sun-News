import {configureStore} from '@reduxjs/toolkit';
import dataSlice from './slice/dataSlice';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './saga/rootSaga';

const sagaMiddleWare = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({thunk: false}).concat(sagaMiddleWare),
});
sagaMiddleWare.run(rootSaga);

export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxStoreDispatch = typeof reduxStore.dispatch;
