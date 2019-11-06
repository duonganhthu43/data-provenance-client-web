import { call, put, takeLatest } from 'redux-saga/effects';
import { datasetService } from '../../services/datasetService';

export default function* sagas() {
	yield takeLatest("GET_DATASET_OF_CURRENT_USER_REQUEST", getDatasetOfCurrentUser);	
}

function* getDatasetOfCurrentUser(action) {
	try {
		yield put({ type: "GET_DATASET_OF_CURRENT_USER_LOADING" });
		const lstDataset = yield call(datasetService.getDatasetOfCurrentUser);
		yield put({ type: "GET_DATASET_OF_CURRENT_USER_SUCCESS", lstDataset});
	} catch (error) {
		 yield put({ type: "GET_DATASET_OF_CURRENT_USER_FAILED", error });
	}
}