import { request } from 'umi';

export async function addDict(params) {
  return request('/api/dict/create', { method: 'POST', data: params });
}

export async function updateDict(params) {
  return request('/api/dict/update', { method: 'POST', data: params });
}

export async function delDict(params) {
  return request('/api/dict/del', { method: 'POST', data: params });
}

export async function getDictList(params) {
  return request('/api/dict/list', { method: 'POST', data: params });
}

export async function addDictItem(params) {
  return request('/api/dictItem/create', { method: 'POST', data: params });
}

export async function updateDictItem(params) {
  return request('/api/dictItem/update', { method: 'POST', data: params });
}

export async function delDictItem(params) {
  return request('/api/dictItem/del', { method: 'POST', data: params });
}

export async function getDictItemAll(params) {
  return request('/api/dictItem/all', { method: 'POST', data: params });
}
