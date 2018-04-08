import {
  doQueryCustomer,
  doAddCustomer,
  doRemoveCustomer,
  doActivateCustomer,
  doDeactivateCustomer,
  doUpdateCustomerStatus, doDeleteCustomer, doUpdateCustomerName,
} from '../services/api';

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
    *show({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doShowCustomer, 'saveCustomer');
    },
    *update_name({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateCustomerName, 'saveCustomer');
    },
    *update_status({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateCustomerStatus, 'saveCustomer');
    },
    *delete({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeleteCustomer, 'saveCustomer');
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
