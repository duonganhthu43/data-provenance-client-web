
let defaultState = {
    resource: undefined,
    provenance: undefined,
    history: undefined,
    loading: {
        loadingResource: false,
        loadingProvenance: false
    },
    errorMessage: undefined,
    successMessage: undefined
};



export const init = () => {
    return defaultState
};

const ACTION_HANDLERS = {
    "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_START_LOADING": (state) => {
        return {
            ...state,
            dataset: undefined,
            loading: { ...state.loading, loadingProvenance: true }
        }
    },
    "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_SUCCESS": (state, { resultData }) => {
        const { imageData, resourceProvenance } = resultData
        return {
            ...state,
            loading: { ...state.loading, loadingProvenance: false },
            provenance: { ...state.provenance, imageData, json: resourceProvenance }
        }
    },
    "GET_RESOURCE_DETAIL_BY_ID_START_LOADING": (state) => {
        return {
            ...state,
            dataset: undefined,
            loading: { ...state.loading, loadingResource: true }
        }
    },
    "GET_RESOURCE_DETAIL_BY_ID_REQUEST_SUCCESS": (state, { resourceDetail }) => {
        return {
            ...state,
            resource: resourceDetail,
            loading: { ...state.loading, loadingResource: false }
        }
    },
    "GET_RESOURCE_DETAIL_HISTORY_BY_ID_REQUEST_SUCCESS": (state, { resourceDetailHistory }) => {
        return { ...state, history: resourceDetailHistory }
    },
    "GET_RESOURCE_DETAIL_PROVENANCE_BY_FORMAT_REQUEST_SUCCESS":(state, {updatedObject}) => {
        return {...state, provenance: {...state.provenance, ...updatedObject}}
    },

    "CLEAN_UP_RESOURCE_DETAIL": (state) => {
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
