export const getDatasetDetailByIdRequest = ({datasetId}) => {
	return { type: "GET_DATASET_DETAIL_BY_ID_REQUEST", datasetId };
}

export const getDatasetDetailProvenanceByIdRequest = ({datasetId}) => {
	return { type: "GET_DATASET_DETAIL_PROVENANCE_BY_ID_REQUEST", datasetId };
}

export const getProvenanceByFormat = ({format}) => {
	return { type: "GET_DATASET_DETAIL_PROVENANCE_BY_FORMAT", format };
}

export const getProvN = () => {
	return { type: "GET_DATASET_PROVN" };
}

export const getProvPDF = () => {
	return { type: "GET_DATASET_PROVPDF" };
}

export const getDatasetDetailHistoryByIdRequest = ({datasetId}) => {
	return { type: "GET_DATASET_DETAIL_HISTORY_BY_ID_REQUEST", datasetId };
}

export const cleanupDatasetDetail = () => {
	return { type: "CLEAN_UP_DATASET_DETAIL" };

}

