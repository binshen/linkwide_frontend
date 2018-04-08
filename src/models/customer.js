import { doQueryCustomer, doAddCustomer, doRemoveCustomer, doActivateCustomer, doDeactivateCustomer } from '../services/api';

export default {
  namespace: 'customer',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(doQueryCustomer, payload);
      yield put({
        type: 'saveCustomer',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(doAddCustomer, payload);
      yield put({
        type: 'saveCustomer',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(doRemoveCustomer, payload);
      yield put({
        type: 'saveCustomer',
        payload: response,
      });
      if (callback) callback();
    },
    *activate({ payload, callback }, { call, put }) {
      const response = yield call(doActivateCustomer, payload);
      yield put({
        type: 'saveCustomer',
        payload: response,
      });
      if (callback) callback();
    },
    *deactivate({ payload, callback }, { call, put }) {
      const response = yield call(doDeactivateCustomer, payload);
      yield put({
        type: 'saveCustomer',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveCustomer(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
