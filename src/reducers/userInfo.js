
let defaultState = {
  currentCertifier: {

  },
  loading: {
    loadingCertifier: false
  },
  errorMessage: undefined,
  successMessage: undefined
};



export const init = () => {
  return defaultState
};

const ACTION_HANDLERS = {
  "GET_USER_BY_FINGERPRINT_START_LOADING": (state) => {
    return {
      ...state,
      currentCertifier: {},
      loading: { ...state.loading, loadingCertifier: true }
    }
  },
  "GET_USER_BY_FINGERPRINT_SUCCESS": (state, { listUser }) => {
    if (listUser && listUser.length > 0) {
      return { ...state, currentCertifier: listUser[0], loading: { ...state.loading, loadingCertifier: false } }
    }
    return { ...state }
  },

  "GET_USER_BY_FINGERPRINT_ERROR": (state, error) => {
    return { ...state, currentCertifier: {}, loading: { ...state.loading, loadingCertifier: false }, errorMessage: error }
  },
  "CLEAR_CERTIFIER_INFO": (state) => {
    return defaultState
  }

};

const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};

export default reducer;
