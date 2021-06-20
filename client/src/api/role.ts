import { request } from 'umi';

export async function getRoleList(params) {
  return request('/api/AdminRole/query', { method: 'GET', data: params });
}

export async function addRole(params) {
  return request('/api/AdminRole/create', { method: 'POST', data: params });
}

export async function delRole(params) {
  return request('/api/AdminRole/remove', { method: 'DELETE', data: params });
}

export async function updateRole(params) {
  return request('/api/AdminRole/update', { method: 'PUT', data: params });
}
