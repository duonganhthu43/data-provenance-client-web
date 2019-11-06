import { call, put, takeLatest } from 'redux-saga/effects';
import { userInfoService } from '../../services/userInfoService';

export default function* sagas() {
	yield takeLatest("GET_USER_BY_FINGERPRINT", getUserInfoByFingerPrint);

}

function* getUserInfoByFingerPrint(action) {
	try {
		const { fingerprint } = action
		yield put({ type: "GET_USER_BY_FINGERPRINT_START_LOADING" });
		const listUser = yield call(userInfoService.getUserByFingerprint, { fingerprint });
		console.log('==== data from api ', listUser)
		yield put({ type: "GET_USER_BY_FINGERPRINT_SUCCESS", listUser});
	} catch (error) {
		// yield put({ type: "LOGIN_FAILED", error });
	}
}


