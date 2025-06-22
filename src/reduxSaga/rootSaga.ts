// rootSaga.ts
import {takeLatest} from 'redux-saga/effects';
import {loadExploreData, searchTags} from './explore/exploreSlice';
import {loadHomeData} from './home/homeSlice';
import {loadExploreDataWorker, searchTagsWorker} from './explore/exploreSaga';
import {loadHomeDataWorker} from './home/homeSaga';
import {loadProfile} from './profile/profileSlice';
import {loadProfileWorker} from './profile/profileSaga';

export function* rootSaga() {
  yield takeLatest(loadHomeData.type, loadHomeDataWorker);
  yield takeLatest(loadExploreData.type, loadExploreDataWorker);
  yield takeLatest(loadProfile.type, loadProfileWorker);
  yield takeLatest(searchTags.type, searchTagsWorker)
}
