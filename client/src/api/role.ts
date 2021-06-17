import { request } from 'umi';

export async function getRoleAll(params) {
  return request('/api/role/all', { method: 'POST', data: params });
}

export async function addRole(params) {
  return request('/api/role/create', { method: 'POST', data: params });
}

export async function delRole(params) {
  return request('/api/role/del', { method: 'POST', data: params });
}

export async function updateRole(params) {
  return request('/api/role/update', { method: 'POST', data: params });
}
