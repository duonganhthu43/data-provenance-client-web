import { call, put, takeLatest } from 'redux-saga/effects';
import { loginService } from '../../services/loginService';
import localStorageUtilities from '../../utils/localStorageUtilities'

export default function* sagas() {
	yield takeLatest("REQUEST_LOGIN_BY_EMAIL", loginByEmail);
	yield takeLatest("REQUEST_GET_USER_INFO", getUserInfo);
	yield takeLatest("SIGN_OUT", signOut);
}

function* loginByEmail(action) {
	try {
		yield put({ type: "START_LOADING", loadingAction: "login" });
		const data = yield call(loginService.loginByEmailApiKey, action.payload);
		const { access_token,  userData ,identities, attributes} = data
		let myUserData = {...userData, identities, attributes}
		localStorageUtilities.setItem('access_token', access_token);
		localStorageUtilities.setItem('user_info', myUserData);
		yield put({ type: "LOGIN_SUCCESSFUL", data: { access_token, userData: myUserData } });
	} catch (error) {
		yield put({ type: "LOGIN_FAILED", error });
	}
}

function* getUserInfo() {
	try {
		yield put({ type: "START_LOADING", loadingAction: "getUserInfo" });
		const userInfo = yield call(loginService.getUserInfo);
		let synchronizeDispatcherInfo = { ...userInfo.data, socketToken: userInfo.socket_token }
		localStorageUtilities.setItem('user_info', synchronizeDispatcherInfo);
		yield put({ type: "GET_USER_INFO_SUCCESSFUL", data: synchronizeDispatcherInfo });
		yield put({ type: "REQUEST_GET_COMPANY_INFO" });
	} catch (error) {
		yield put({ type: "GET_USER_INFO_FAILED", error });
	}
}

function* signOut() {
	localStorageUtilities.removeItem('access_token');
	localStorageUtilities.removeItem('user_info')
	yield put({ type: "SIGN_OUT_SUCCESSFUL" });
}
