export const onValidateInt = (inputNumber) => {
    return inputNumber > 99999999 ? 99999999 : (inputNumber < 0) ? 0 : inputNumber
}

export const isLiteVersion = () => {
    //const patt = new RegExp(process.env.REACT_APP_SSO_HOST_REGEX);
    return true
    //return patt.test(window.location.hostname);
}

export const IncludeURL = process.env.REACT_APP_INCLUDE_URL