import {
  doQueryComponentType,
  doAddComponentType,
  doRemoveComponentType,
  doDeleteComponentType,
  doUpdateComponentType,
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
  namespace: 'componentType',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield doEffects(payload, null, call, put, doQueryComponentType, 'save');
    },
    *add({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doAddComponentType, 'save');
    },
    *remove({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doRemoveComponentType, 'save');
    },
    *delete({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeleteComponentType, 'save');
    },
    *update({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateComponentType, 'save');
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
