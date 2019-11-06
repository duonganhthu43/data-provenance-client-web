const BASE_URL = 'http://localhost:3004';

export class BaseService {
	getBaseURL(path) {
		return `${BASE_URL}/api/${path}`;
	}
	_extractData(response) {
		const { data } = response
		return data
	}

	_handleError = (error) => {
		const { response } = error;
		if (!response) throw error
		let _errorObj = {
			statusCode: response.status ? response.status : null,
			message: null,
			statusText: response.statusText ? response.statusText : null
		};
		if (response['data']) {
			const { data } = response;
			if (data['failed_operation'] && data['failed_value']) {
				_errorObj.message = data['failed_value'];
			} else if (data['message']) {
				_errorObj.message = data['message'];
			} else if (data['data']) {
				_errorObj.message = Object.keys(data['data']).map((key) => data['data'][key][0])[0];
			}
		}
		throw _errorObj;
	}
}
