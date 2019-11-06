let defaultState = {
    loading: {
    },
    info: {
        users: []
    },
    errorMessage: undefined,
    successMessage: undefined
};
export const init = () => {
    return defaultState
};

const ACTION_HANDLERS = {
    "UPDATE_USERS": (state, data) => {
        return {
            ...state,
            info: { ...state.info, users: data.result }
        };
    },
    "UPDATE_USER": (state, data) => {
        let updatedUser = data.result.data
        let message = data.result.message
        if (state.info && state.info && state.info.users) {
            var newArray = state.info.users;
            var currentIndex = newArray.findIndex((user) => { return user.id === updatedUser.id })
            if (currentIndex > -1) {
                newArray[currentIndex] = updatedUser
            } else {
                newArray.push(updatedUser)
            }
            return { ...state, info: { ...state.info, users: newArray }, successMessage: message }
        } else {
            return { ...state, successMessage: message, info: { ...state.info, users: [updatedUser] } }
        }
    },
    "UPDATE_USER_ERROR": (state, data) => {
        return { ...state, errorMessage: data.message }
    },
    "CLEAR_MESSAGE": (state) => {
        return {
            ...state,
            successMessage: undefined,
            errorMessage: undefined
        }
    }
}

const reducer = (state = defaultState, action) => {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state
};

export default reducer;
