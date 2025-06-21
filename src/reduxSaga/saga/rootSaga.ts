import { take, takeLatest } from "redux-saga/effects";
import { loadExploreDataWorker } from "./dataSaga";
import { loadExploreData } from "../slice/dataSlice";


export function* rootSaga() {
    yield takeLatest(loadExploreData.type, loadExploreDataWorker)
}