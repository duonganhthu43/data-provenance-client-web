import { call, put, takeLatest, select } from 'redux-saga/effects';
import { datasetDetailService } from '../../services/dataset-detail.service';
import { provenanceService } from '../../services/provenance.service'
export const getCurrentJsonProvenance = (state) => state.datasetDetail && state.datasetDetail.provenance && state.datasetDetail.provenance.json;
//const { latestRequestId, requests } = yield select(getOptimisationData);

export default function* sagas() {
	yield takeLatest("GET_DATASET_DETAIL_BY_ID_REQUEST", getDatasetDetailById);
	yield takeLatest("GET_DATASET_DETAIL_PROVENANCE_BY_ID_REQUEST", getDatasetProvenanceDetailById);
	yield takeLatest("GET_DATASET_PROVN", getDatasetProvN);
	yield takeLatest("GET_DATASET_PROVPDF", getDatasetPDF);
	yield takeLatest("GET_DATASET_DETAIL_HISTORY_BY_ID_REQUEST", getDatasetDetailHistoryById)
}

function* getDatasetDetailHistoryById(action) {
	try {
		const { datasetId } = action
		// yield put({ type: "GET_DATASET_DETAIL_BY_ID_START_LOADING" });
		const datasetDetailHistory = yield call(datasetDetailService.getDatasetDetailHistoryById, { datasetId });
		yield put({ type: "GET_DATASET_DETAIL_HISTORY_BY_ID_REQUEST_SUCCESS", datasetDetailHistory });
	} catch (error) {
		// yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}

function* getDatasetDetailById(action) {
	try {
		const { datasetId } = action
		yield put({ type: "GET_DATASET_DETAIL_BY_ID_START_LOADING" });
		const datasetDetail = yield call(datasetDetailService.getDatasetDetailById, { datasetId });
		yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_SUCCESS", datasetDetail });
	} catch (error) {
		yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}

function* getDatasetProvenanceDetailById(action) {
	try {
		const { datasetId } = action
		yield put({ type: "GET_DATASET_DETAIL_PROVENANCE_BY_ID_START_LOADING" });
		const datasetProvenanceDetail = yield call(datasetDetailService.getDatasetDetailProvenanceById, { datasetId });

		//const modelImage = yield call(datasetDetailService.getProvenanceModelImage, { "translate": 'svg', "type": "json", "statements": JSON.stringify(datasetProvenanceDetail) })
		const modelImage = yield call(provenanceService.generateSvgProv, { jsonProv: datasetProvenanceDetail })
		console.log('==== model image response ', modelImage)
		if (modelImage && modelImage.data) {
			let imageData = modelImage.data
			let resultData = { imageData, datasetProvenanceDetail }
			yield put({ type: "GET_DATASET_DETAIL_PROVENANCE_BY_ID_SUCCESS", resultData });
		}
		// if (modelImage ) {
		// 	let imageData = modelImage
		// 	let resultData = { imageData, datasetProvenanceDetail }
		// 	yield put({ type: "GET_DATASET_DETAIL_PROVENANCE_BY_ID_SUCCESS", resultData });
		// }
	} catch (error) {
		//yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}

function* getDatasetProvN(action) {
	try {
		const { format } = action
		const currentJsonFormat = yield select(getCurrentJsonProvenance)
		const newFormat = yield call(provenanceService.generateProvN, { jsonProv: currentJsonFormat })
		console.log('====== newFormat ', newFormat)
		let updatedObject = {}
		updatedObject['PROVN'] = newFormat.data
		yield put({ type: "GET_DATASET_DETAIL_PROVENANCE_BY_FORMAT_REQUEST_SUCCESS", updatedObject });
	} catch (error) {
		//yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}




function* getDatasetPDF(action) {
	console.log('==== getDatasetPDF')
	try {
		const currentJsonFormat = yield select(getCurrentJsonProvenance)
		const pdfResponse = yield call(provenanceService.generateProvPDF, { jsonProv: currentJsonFormat })
		// const link = document.createElement('a');
		// link.href = url;
		// link.setAttribute('download', `sample.provenance`);
	  
		// const file = new Blob([pdfResponse.data], {
		// 	type: "application/pdf"
		//   });
		//   console.log('==== file', file)
		// const fileURL = URL.createObjectURL(file);
		// console.log('==== fileURL',fileURL)
		// window.open(fileURL);
		//updatedObject['PROVN'] = newFormat.data
		//yield put({ type: "GET_DATASET_DETAIL_PROVENANCE_BY_FORMAT_REQUEST_SUCCESS", updatedObject });
	} catch (error) {
		console.log('==== errr ', error)
		//yield put({ type: "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED", error });
	}
}




