import { all, call, put, takeLatest } from 'redux-saga/effects';
import { datasetService } from '../../services/datasetService';
import { datasetDetailService } from '../../services/dataset-detail.service';


export default function* sagas() {
	yield takeLatest("CREATE_NEW_DATASET_REQUEST", createNewDataset);
	yield takeLatest("UPDATE_DATASET_REQUEST", updateDataset);
	yield takeLatest("GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST", getDatasetDetailById)
}

function* updateDataset(action) {
	const { datasetInfo } = action
	try {
		// merge add, update, delete, unchange
		const { add, update, unchange } = datasetInfo.resources
		const deleteArray = datasetInfo.resources.delete
		let newDatasetResource = add.concat(update).concat(unchange)
		const newDataset = yield call(datasetService.updateDataset, { ...datasetInfo, resources: newDatasetResource });
		const updateMultipleResources = yield call(datasetService.updateMultipleResources, { add, update, delete: deleteArray });
		yield put({ type: "UPDATE_DATASET_REQUEST_SUCCESS", newDataset });
	} catch (error) {
		yield put({ type: "UPDATE_DATASET_REQUEST_FAILED", error });
	}
}

function* createNewDataset(action) {
	const { datasetInfo } = action
	try {
		const newDataset = yield call(datasetService.createNewDataset, datasetInfo);
		const multipleResoures = yield call(datasetService.createMultipleResources, datasetInfo.resources);
		yield put({ type: "CREATE_NEW_DATASET_REQUEST_SUCCESS", newDataset });
	} catch (error) {
		yield put({ type: "CREATE_NEW_DATASET_REQUEST_FAILED", error });
	}
}
function* getDatasetDetailById(action) {
	try {
		const { datasetId } = action
		yield put({ type: "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_START_LOADING" });
		const datasetDetail = yield call(datasetDetailService.getDatasetDetailById, { datasetId });
		yield put({ type: "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_SUCCESS", datasetDetail });
	} catch (error) {
		yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", errorMessage: error });
	}
}