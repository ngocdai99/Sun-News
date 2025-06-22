// homeSaga/ts
import {put, call} from 'redux-saga/effects';

import {loadHomeDataFulfilled, loadHomeDataRejected} from './homeSlice';

import {SagaIterator} from 'redux-saga';
import newsService from '~/services/newsService';
export function* loadHomeDataWorker(): SagaIterator {
  try {
    const homeResponse = yield call(newsService.getPosts);

    yield put(loadHomeDataFulfilled({dataPosts: homeResponse.data}));
  } catch (error) {
    console.log('Error Home saga', error);
    yield put(loadHomeDataRejected('Error Home saga'));
  }
}
