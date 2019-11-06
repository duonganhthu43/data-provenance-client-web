import {BaseService} from './baseService';
import {authService} from './authService';

export class LoginService extends BaseService {
  constructor({authService}) {
    super();
    this._authService = authService;
  }

  loginByEmailApiKey = ({email, password, options}) => {
    return this._authService.post(
      this.getBaseURL('users/login'),
      JSON.stringify({
        username: email,
        password
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  getUserInfo = () => {
    return this._authService.get(this.getBaseURL('dispatcher/info'))
      .then(response => {
        const _result = this._extractData(response);
        return _result
      })
      .catch(error => this._handleError(error));
  }

}

export const loginService = new LoginService({authService});
