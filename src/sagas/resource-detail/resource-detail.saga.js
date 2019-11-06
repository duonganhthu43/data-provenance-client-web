import { call, put, takeLatest, select } from 'redux-saga/effects';
import { resourceDetailService } from '../../services/resource-detail.service';
import {provenanceService} from '../../services/provenance.service'
export const getCurrentJsonProvenance = (state) => state.resourceDetail && state.resourceDetail.provenance && state.resourceDetail.provenance.json;

export default function* sagas() {
	yield takeLatest("GET_RESOURCE_DETAIL_BY_ID_REQUEST", getResourceDetailByIdRequest);
	yield takeLatest("GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_REQUEST", getResourceProvenanceById);
	yield takeLatest("GET_RESOURCE_DETAIL_HISTORY_BY_ID_REQUEST", getResourceHistoryById);
	yield takeLatest("GET_RESOURCE_PROVN", getResourceProvN);

}

function* getResourceProvN() {
	try {
		const currentJsonFormat = yield select(getCurrentJsonProvenance)
		const newFormat = yield call(provenanceService.generateProvN, { jsonProv: currentJsonFormat })
		let updatedObject = {}
		updatedObject['PROVN'] = newFormat.data
		yield put({ type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_FORMAT_REQUEST_SUCCESS", updatedObject });
	} catch (error) {
		//yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}
function* getResourceHistoryById(action) {
	try {
		const { resourceId } = action
		// yield put({ type: "GET_DATASET_DETAIL_BY_ID_START_LOADING" });
		const resourceDetailHistory = yield call(resourceDetailService.getResourceHistory, { resourceId });
		yield put({ type: "GET_RESOURCE_DETAIL_HISTORY_BY_ID_REQUEST_SUCCESS", resourceDetailHistory });
	} catch (error) {
		// yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}
function* getResourceProvenanceById(action) {
	try {
		const { resourceId } = action
		yield put({ type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_START_LOADING" });
		const resourceProvenance = yield call(resourceDetailService.getResourceProvenanceById, { resourceId });
		const modelImage = yield call(provenanceService.generateSvgProv, { jsonProv: resourceProvenance })
		if (modelImage && modelImage.data) {
			let imageData = modelImage.data
			let resultData = { imageData, resourceProvenance }
			yield put({ type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_SUCCESS", resultData });
		}
	} catch (error) {
		yield put({ type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_FAILED", error });
	}
}

function* getResourceDetailByIdRequest(action) {
	try {
		const { resourceId } = action
		yield put({ type: "GET_RESOURCE_DETAIL_BY_ID_START_LOADING" });
		const resourceDetail = yield call(resourceDetailService.getResourceDetailById, { resourceId });
		yield put({ type: "GET_RESOURCE_DETAIL_BY_ID_REQUEST_SUCCESS", resourceDetail });
	} catch (error) {
		yield put({ type: "GET_RESOURCE_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}





