
let defaultState = {
    dataset: undefined,
    provenance: undefined,
    history: undefined,
    resources: undefined,
    loading: {
        loadingDataset: false,
        loadingProvenance: false

    },
    errorMessage: undefined,
    successMessage: undefined
};



export const init = () => {
    return defaultState
};

const ACTION_HANDLERS = {
    "GET_DATASET_DETAIL_BY_ID_START_LOADING": (state) => {
        return {
            ...state,
            dataset: undefined,
            loading: { ...state.loading, loadingDataset: true }
        }
    },
    "GET_DATASET_DETAIL_BY_ID_REQUEST_SUCCESS": (state, { datasetDetail }) => {
        return {
            ...state,
            dataset: datasetDetail,
            loading: { ...state.loading, loadingDataset: false }
        }
    },
    "GET_DATASET_DETAIL_PROVENANCE_BY_ID_START_LOADING": (state) => {
        return {
            ...state,
            loading: { ...state.loading, loadingProvenance: true }
        }
    },
    "GET_DATASET_DETAIL_PROVENANCE_BY_ID_SUCCESS": (state, {resultData}) => {
        const { imageData, datasetProvenanceDetail } = resultData
        return {
            ...state,
            loading: { ...state.loading, loadingProvenance: false },
            provenance: {...state.provenance, imageData, json: datasetProvenanceDetail }
        }
    },
    "GET_DATASET_DETAIL_PROVENANCE_BY_FORMAT_REQUEST_SUCCESS" : (state, {updatedObject}) => {
        return {...state, provenance: {...state.provenance, ...updatedObject}}
    },
    "GET_DATASET_DETAIL_BY_ID_REQUEST_FAILED": (state, error) => {
        return { ...state, dataset: undefined, loading: { ...state.loading, loadingDataset: false }, errorMessage: error }
    },
    "GET_DATASET_DETAIL_HISTORY_BY_ID_REQUEST_SUCCESS": (state, {datasetDetailHistory}) => {
        return { ...state, history: datasetDetailHistory }
    },
    "CLEAN_UP_DATASET_DETAIL": (state) => {
        return defaultState
    },
    "CLEAR_DATASET_INFO": (state) => {
        return defaultState
    }

};

const reducer = (state = defaultState, action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};

export default reducer;
