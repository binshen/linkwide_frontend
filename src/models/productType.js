import {
  doQueryProductType,
  doAddProductType,
  doRemoveProductType,
  doDeleteProductType,
  doUpdateProductType,
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
  namespace: 'productType',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield doEffects(payload, null, call, put, doQueryProductType, 'save');
    },
    *add({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doAddProductType, 'save');
    },
    *remove({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doRemoveProductType, 'save');
    },
    *delete({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeleteProductType, 'save');
    },
    *update({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateProductType, 'save');
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
