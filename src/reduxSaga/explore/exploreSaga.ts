import {put, all, call, delay} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';
import {
  loadExploreDataFulfilled,
  loadExploreDataRejected,
  searchTagsFulfilled,
  searchTagsRejected,
} from './exploreSlice';
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
    yield put(loadExploreDataRejected({error: 'redux saga error'}));
  }
}

export function* searchTagsWorker(action: any): SagaIterator {
  try {
    yield delay(500);
    const searchResponse = yield call(
      newsService.getTags,
      action.payload.keyword,
    );

    yield put(
      searchTagsFulfilled({
        dataTags: searchResponse.data,
      }),
    );
  } catch (error) {
    console.log('redux saga error searchTags', error);
    yield put(searchTagsRejected({error: 'searchTags error'}));
  }
}
