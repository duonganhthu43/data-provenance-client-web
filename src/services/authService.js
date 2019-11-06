import Axios from 'axios';

import { BaseService } from './baseService';
import localStorageUtilities from '../utils/localStorageUtilities'
export class AuthService extends BaseService {
	get = (url, params, options) => {
		return Axios.get(url, { params, ...this._createAuthRequestConfig(options) });
	}
	post = (url, body, options) => {
		return Axios.post(url, body, this._createAuthRequestConfig(options));
	}
	put = (url, body, options) => {
		return Axios.put(url, body, this._createAuthRequestConfig(options));
	}
	delete = (url, options) => {
		const params = options && options.params
		return Axios.delete(url, { ...this._createAuthRequestConfig(options), params })
	}

	_createAuthRequestConfig = (options) => {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		};
		const _accessToken = localStorageUtilities.getItem('access_token');

		if (_accessToken) {
			headers['Authorization'] = 'Bearer '+ _accessToken;
		}
		
		if (options) {
			const { authorization } = options;
			if (authorization) {
				headers['Authorization'] = authorization;
			}
			if(options["Content-Type"]) {
				headers["Content-Type"] = options["Content-Type"]
			}
			if(options["Accept"]) {
				headers['Accept'] = options["Accept"]
			}
		}
		return { headers };
	}
}

export const authService = new AuthService();
