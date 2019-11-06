
import localStorageUtilities from '../utils/localStorageUtilities'
let defaultState = {
  userInfo: {
    access_token: undefined,
    userData: undefined
  },
  loading: {
    login: false,
    getUserInfo: false,
  },
  errorMessage: undefined,
  successMessage: undefined
};



export const init = () => {
  return defaultState
};

const ACTION_HANDLERS = {
  "LOGIN_SUCCESSFUL": (state, sagaData) => {
    const data = sagaData.data;
    return {
      ...state,
      userInfo: data,
      loading: { ...state.loading, login: false }
    }
  },
  "LOGIN_FAILED": (state, data) => {
    const { error } = data
    return {
      ...state,
      loading: { ...state.loading, login: false },
      errorMessage: error.message
    };
  },
  "GET_USER_INFO_SUCCESSFUL": (state, sagaData) => {
    const data = sagaData.data;
    return {
      ...state,
      userInfo: { ...state.userInfo, ...data },
      loading: { ...state.loading, getUserInfo: false }
    };
  },
  "GET_USER_INFO_FAILED": (state, sagaData) => {
    const { error } = sagaData;
    return {
      ...state,
      loading: { ...state.loading, getUserInfo: false },
      error: {
        failed: true,
        message: error.message ? error.message : "Failed to get sender info"
      }
    }
  },
  "START_LOADING": (state, sagaData) => {
    return {
      ...state,
      loading: { ...state.loading, [sagaData.loadingAction]: true }
    }
  },
  "SIGN_OUT_SUCCESSFUL": (state, sagaData) => {
    return defaultState;
  },
  "CLEAR_MESSAGE": (state) => {
    return {
      ...state,
      errorMessage: undefined
    }
  },
  'persist/REHYDRATE': (state, action) => {
    if (localStorageUtilities.hasItem('access_token')) {
      try {
        const access_token = localStorageUtilities.getItem('access_token');
        let userData = localStorageUtilities.getItem('user_info')       
        return { ...state, userInfo: {access_token,userData} }
      } catch (e) {
        localStorageUtilities.removeItem('access_token')
        return state
      }
    } else {
      return action && action.payload && action.payload.login ? { ...action.payload.login } : state
    }
  }
  // 'persist/REHYDRATE': (state, action) => {

  //   if (localStorageUtilities.hasItem('access_token')) {
  //     try {
  //       const access_token = localStorageUtilities.getItem('access_token');
  //       let userData = localStorageUtilities.getItem('user_info')
  //       return {
  //         ...state, userInfo: {
  //           access_token,
  //           userData
  //         }
  //       }
  //     } catch (e) {
  //       localStorageUtilities.removeItem('access_token')
  //       localStorageUtilities.removeItem('user_info')
  //       return defaultState
  //     }
  //   } else {
  //     return action && action.payload && action.payload.login ? { ...action.payload.login } : state
  //   }
  // }
};

const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
};

export default reducer;
