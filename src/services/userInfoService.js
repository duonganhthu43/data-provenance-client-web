import {BaseService} from './baseService';
import {authService} from './authService';

export class UserInfoService extends BaseService {
  constructor({authService}) {
    super();
    this._authService = authService;
  }

  getUserByFingerprint = ({fingerprint, options}) => {
    return this._authService.post(
      this.getBaseURL('users/getInfoByFingerprint'),
      JSON.stringify({
        fingerprint: fingerprint,
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }
}

export const userInfoService = new UserInfoService({authService});
