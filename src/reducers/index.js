import { combineReducers } from 'redux';
import { persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { connectRouter } from 'connected-react-router';
import login from './login';
import userInfo from './userInfo'
import dataset from './dataset'
import datasetDetail from './datasetDetail'
import resourceDetail from './resourceDetail'
import resources from './resources'
import createDataset from './createDataset'

let blacklistTransform = createTransform(
  (inboundState, key) => {
    return {
      ...inboundState
    }
  }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [blacklistTransform],
};

const reducers = (history) => persistReducer(persistConfig, combineReducers({
  router: connectRouter(history),
  login,
  userInfo,
  dataset,
  datasetDetail,
  resources,
  resourceDetail,
  createDataset
}));

export default reducers;
