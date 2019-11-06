import { BaseService } from './baseService';
import { authService } from './authService';

export class ResourcesService extends BaseService {
  constructor({ authService }) {
    super();
    this._authService = authService;
  }

  getResourcesOfCurrentUser = () => {
    return this._authService.get(
      this.getBaseURL('users/resources')
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }
}

export const datasetService = new ResourcesService({ authService });
