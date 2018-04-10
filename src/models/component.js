import {
  doQueryComponent,
  doAddComponent,
  doRemoveComponent,
  doDeleteComponent,
  doUpdateComponent,
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
  namespace: 'component',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield doEffects(payload, null, call, put, doQueryComponent, 'save');
    },
    *add({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doAddComponent, 'save');
    },
    *remove({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doRemoveComponent, 'save');
    },
    *delete({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doDeleteComponent, 'save');
    },
    *update({ payload, callback }, { call, put }) {
      yield doEffects(payload, callback, call, put, doUpdateComponent, 'save');
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
