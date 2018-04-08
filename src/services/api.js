import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// ============================================================

const baseURL = "http://localhost:3000";

export async function doAccountLogin(params) {
  return request(`${baseURL}/api/v1/login`, { method: 'POST', body: params });
}

export async function doQueryCustomer(params) {
  return request(`${baseURL}/api/v1/customers?${stringify(params)}`);
}

export async function doAddCustomer(params) {
  return request(`${baseURL}/api/v1/customers`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function doRemoveCustomer(params) {
  return request(`${baseURL}/api/v1/customers`, {
    method: 'POST',
    body: {
      ...params,
      method: 'remove',
    },
  });
}

export async function doActivateCustomer(params) {
  return request(`${baseURL}/api/v1/customers`, {
    method: 'POST',
    body: {
      ...params,
      method: 'activate',
    },
  });
}

export async function doDeactivateCustomer(params) {
  return request(`${baseURL}/api/v1/customers`, {
    method: 'POST',
    body: {
      ...params,
      method: 'deactivate',
    },
  });
}

export async function doShowCustomer(params) {
  return request(`${baseURL}/api/v1/customers/${params.id}`);
}

export async function doUpdateCustomerStatus(params) {
  return request(`${baseURL}/api/v1/customers/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'update_status',
    },
  });
}

export async function doUpdateCustomerName(params) {
  return request(`${baseURL}/api/v1/customers/${params.id}`, {
    method: 'PUT',
    body: {
      ...params,
      method: 'update_name',
    },
  });
}

export async function doDeleteCustomer(params) {
  return request(`${baseURL}/api/v1/customers/${params.id}`, { method: 'DELETE' });
}
