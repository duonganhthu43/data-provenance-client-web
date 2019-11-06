
let defaultState = {
    dataset: undefined,
    loading: {
        isCreating: false,
        isLoadingDetail: false
    },
    errorMessage: undefined,
    successMessage: undefined
};



export const init = () => {
    return defaultState
};

const ACTION_HANDLERS = {
    "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_START_LOADING": (state) => {
        return {
            ...state,
            loading: { ...state.loading, isLoadingDetail: true, isCreating: false }
        }
    },
    "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_SUCCESS": (state, { datasetDetail }) => {
        console.log('=====  GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_SUCCESS ', datasetDetail)
        return {
            ...state,
            dataset: datasetDetail,
            loading: { ...state.loading, isLoadingDetail: false }
        }
    },
    "GET_DATA_SET_DETAIL_FOR_EDIT_REQUEST_ERROR": (state, { errorMessage }) => {
        return {
            ...state,
            errorMessage: "Loading data set detail error: " + errorMessage,
            loading: { ...state.loading, isLoadingDetail: false }
        }
    },
    "UPDATE_DATASET_REQUEST": (state, { datasetInfo }) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: true }
        }
    },
    "CREATE_NEW_DATASET_REQUEST": (state, { datasetInfo }) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: true }
        }
    },
    "CREATE_NEW_DATASET_REQUEST_SUCCESS": (state) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: false },
            errorMessage: undefined,
            successMessage: "Dataset create success"
        }
    },
    "UPDATE_DATASET_REQUEST_SUCCESS": (state) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: false },
            errorMessage: undefined,
            successMessage: "Dataset update success"
        }
    },
    "UPDATE_DATASET_REQUEST_FAILED": (state, { errorMessage }) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: false },
            errorMessage: errorMessage,
            successMessage: undefined
        }
    },
    "CREATE_NEW_DATASET_REQUEST_FAILED": (state, { errorMessage }) => {
        return {
            ...state,
            loading: { ...state.loading, isCreating: false },
            errorMessage: errorMessage,
            successMessage: undefined
        }
    },
    "CLEAR_MESSAGE": (state) => {
        return {
            ...state,
            errorMessage: undefined,
            successMessage: undefined
        }
    }


};

const reducer = (state = defaultState, action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};

export default reducer;
