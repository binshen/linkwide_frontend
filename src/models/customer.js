import {
  doQueryCustomer,
  doAddCustomer,
  doRemoveCustomer,
  doActivateCustomer,
  doDeactivateCustomer,
  doDeleteCustomer,
  doUpdateCustomerName,
  doUpdateCustomerStatus,
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
      yield doEffects(payload, null, call, put, doQueryCustomer, 'save');
    },
    *add({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doAddCustomer, 'save');
    },
    *remove({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doRemoveCustomer, 'save');
    },
    *activate({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doActivateCustomer, 'save');
    },
    *deactivate({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeactivateCustomer, 'save');
    },
    *delete({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeleteCustomer, 'save');
    },
    *update_name({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateCustomerName, 'save');
    },
    *update_status({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateCustomerStatus, 'save');
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
