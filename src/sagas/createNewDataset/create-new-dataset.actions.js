export const createNewDataset = ({datasetInfo}) => {
	return { type: "CREATE_NEW_DATASET_REQUEST", datasetInfo };
}


export const updateDataset = ({datasetInfo}) => {
	return { type: "UPDATE_DATASET_REQUEST", datasetInfo };
}

export const getDatasetDetailForEdit = ({datasetId}) => {
	return { type: "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST", datasetId };
}

export const clearMessage = () => {
	return { type: "CLEAR_MESSAGE" };
}
