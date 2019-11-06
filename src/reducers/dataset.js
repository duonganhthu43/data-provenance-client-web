
let defaultState = {
    dataset: undefined,
    loading: {
        loadingDataset: false
    },
    errorMessage: undefined,
    successMessage: undefined
};



export const init = () => {
    return defaultState
};

const ACTION_HANDLERS = {
    "GET_DATASET_OF_CURRENT_USER_LOADING": (state) => {
        return {
            ...state,
            dataset: undefined,
            loading: { ...state.loading, loadingDataset: true }
        }
    },
    "GET_DATASET_OF_CURRENT_USER_SUCCESS": (state, { lstDataset }) => {
        if (lstDataset) {
            return { ...state, dataset: lstDataset, loading: { ...state.loading, loadingDataset: false } }
        }
        return { ...state }
    },

    "GET_DATASET_OF_CURRENT_USER_FAILED": (state, error) => {
        return { ...state, dataset: undefined, loading: { ...state.loading, loadingDataset: false }, errorMessage: error }
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
