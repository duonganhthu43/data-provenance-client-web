//http://localhost:3004/api/users/dataset
import { BaseService } from './baseService';
import { authService } from './authService';
import Axios from 'axios';

export class DatasetDetailService extends BaseService {
  constructor({ authService }) {
    super();
    this._authService = authService;
  }
  getDatasetDetailById = ({ datasetId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/dataset'),
      JSON.stringify({
        datasetId: datasetId,
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  getDatasetDetailProvenanceById = ({ datasetId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/dataset/provenance'),
      JSON.stringify({
        datasetId: datasetId,
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }
  getDatasetDetailHistoryById = ({ datasetId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/dataset/history'),
      JSON.stringify({
        datasetId: datasetId,
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  getProvenanceModelImage = ({ translate, type, statements }) => {
    var bodyFormData = new FormData();
    bodyFormData.set('translate', translate)
    bodyFormData.set('type', type)
    bodyFormData.set('statements', statements)
    return Axios.post('https://openprovenance.org/services/provapi/documents/', bodyFormData).then(response => {
      return response
    })
  }
}

export const datasetDetailService = new DatasetDetailService({ authService });
