export const loginByEmail = (payload) => {
	return { type: "REQUEST_LOGIN_BY_EMAIL", payload: payload };
}

export const getUserInfo = () => {
  return { type: 'REQUEST_GET_USER_INFO'};
}

export const resetErrors = () => {
  return { type: 'RESET_ERRORS'};
}

export const signOut = () => {
  return { type: 'SIGN_OUT'};
}

export const clearMessage = () => {
  return {type: 'CLEAR_MESSAGE'}
}

