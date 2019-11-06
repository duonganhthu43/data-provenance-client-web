import { select, takeEvery, all, fork } from 'redux-saga/effects'
import login from './login/loginSaga';
import userInfo from './userInfo/userInfoSaga'
import dataset from './dataset/datasetSaga'
import datasetDetail from './dataset-detail/dataset-detail.saga'
import resourceDetail from './resource-detail/resource-detail.saga'
import createNewDataset from './createNewDataset/create-new-dataset.saga'
function* watchAndLog() {
	yield takeEvery('*', function* logger(action) {
		const state = yield select();
		console.log('action', action);
		console.log('state after', state)
	})
}

export default function* root() {
	yield all([
		fork(watchAndLog),
		fork(login),
		fork(userInfo),
		fork(dataset),
		fork(datasetDetail),
		fork(resourceDetail),
		fork(createNewDataset)
	]);
}
