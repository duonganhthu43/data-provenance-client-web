//http://localhost:3004/api/users/dataset
import { BaseService } from './baseService';
import { authService } from './authService';
import Axios from 'axios';

export class ResourceDetailService extends BaseService {
  constructor({ authService }) {
    super();
    this._authService = authService;
  }
  getResourceDetailById = ({ resourceId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/resource'),
      JSON.stringify({
        resource_id: resourceId
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }

  getResourceProvenanceById = ({ resourceId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/resource/provenance'),
      JSON.stringify({
        resourceId
      }),
      options
    )
      .then(response => {
        const { data } = response
        return data;
      })
      .catch(error => this._handleError(error));
  }
  getResourceHistory = ({ resourceId, options }) => {
    return this._authService.post(
      this.getBaseURL('users/resource/history'),
      JSON.stringify({
        resourceId
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
    return Axios.post('https://openprovenance.org/services/provapi/documents/', bodyFormData).then( response => {
      return response
    })
  }

}

export const resourceDetailService = new ResourceDetailService({ authService });
