// rootSaga.ts
import {takeLatest} from 'redux-saga/effects';
import {loadExploreData} from './explore/exploreSlice';
import {loadHomeData} from './home/homeSlice';
import {loadExploreDataWorker} from './explore/exploreSaga';
import {loadHomeDataWorker} from './home/homeSaga';
import {loadProfile} from './profile/profileSlice';
import {loadProfileWorker} from './profile/profileSaga';

export function* rootSaga() {
  yield takeLatest(loadHomeData.type, loadHomeDataWorker);
  yield takeLatest(loadExploreData.type, loadExploreDataWorker);
  yield takeLatest(loadProfile.type, loadProfileWorker);
}
