import { doQueryCustomer, doAddCustomer, doRemoveCustomer, doActivateCustomer, doDeactivateCustomer } from '../services/api';

function *doEffects(payload, callback, call, put, method, _type) {
  const response = yield call(method, payload);
  yield put({
    type: _type,
    payload: response,
  });
  if (callback) callback();
}

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
      yield doEffects(payload, null, call, put, doQueryCustomer, 'saveCustomer');
    },
    *add({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doAddCustomer, 'saveCustomer');
    },
    *remove({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doRemoveCustomer, 'saveCustomer');
    },
    *activate({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doActivateCustomer, 'saveCustomer');
    },
    *deactivate({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeactivateCustomer, 'saveCustomer');
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
