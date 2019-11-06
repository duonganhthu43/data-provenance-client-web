import { BaseService } from './baseService';
import { authService } from './authService';

export class DatastService extends BaseService {
  constructor({ authService }) {
    super();
    this._authService = authService;
  }

  getDatasetOfCurrentUser = () => {
    return this._authService.get(
      this.getBaseURL('users/dataset')
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  createNewDataset = (datasetInfo) => {
    return this._authService.post(
      this.getBaseURL('users/dataset/new'),
      JSON.stringify(datasetInfo)
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  createMultipleResources = (resources) => {
    return this._authService.post(
      this.getBaseURL('users/resources/create_multiple'),
      JSON.stringify(resources)
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  updateMultipleResources = (resources) => {
    return this._authService.post(
      this.getBaseURL('users/resources/batchUpdate'),
      JSON.stringify(resources)
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  updateDataset = (datasetInfo) => {
    return this._authService.post(
      this.getBaseURL('users/dataset/update'),
      JSON.stringify(datasetInfo)
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }
}

export const datasetService = new DatastService({ authService });
