import { request } from 'umi';

export async function checkOnly(params) {
  return request('/api/base/checkOnly', { method: 'POST', data: params });
}

export async function getApiPerm(params) {
  return request('/api/base/getApiPerm', { method: 'GET', data: params });
}