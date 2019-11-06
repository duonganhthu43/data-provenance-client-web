export const getUserByFingerPrint = ({fingerprint}) => {
	return { type: "GET_USER_BY_FINGERPRINT", fingerprint };
}

