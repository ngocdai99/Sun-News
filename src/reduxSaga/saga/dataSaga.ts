import {put, all, call} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {
  loadExploreDataFulfilled,
  loadExploreDataRejected,
} from '../slice/dataSlice';
import newsService from '~/services/newsService';

export function* loadExploreDataWorker(): SagaIterator {
  try {
    const [tagsResponse, catesResponse] = yield all([
      call(newsService.getTags),
      call(newsService.getCategories),
    ]);
    yield put(
      loadExploreDataFulfilled({
        dataTags: tagsResponse.data,
        dataCates: catesResponse.data,
      }),
    );
  } catch (error) {
    console.log('redux saga error', error);
    yield put(loadExploreDataRejected('redux saga error'));
  }
}
