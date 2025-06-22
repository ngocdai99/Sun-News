import {call, put} from 'redux-saga/effects';

import {loadProfileFulfilled, loadProfileRejected} from './profileSlice';
import {SagaIterator} from 'redux-saga';
import newsService from '~/services/newsService';

export function* loadProfileWorker(): SagaIterator {
  try {
    const profileResponse = yield call(newsService.getCurrentUser);
    yield put(loadProfileFulfilled({data: profileResponse.data}));
  } catch (error) {
    console.log('Error profile saga', error);
    yield put(loadProfileRejected({error: 'Error profile saga'}));
  }
}
