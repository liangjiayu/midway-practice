import { request } from 'umi';

// 用户登录
export async function userLogin(params) {
  return request('/api/user/login', { method: 'POST', data: params });
}

// 获取用户信息
export async function getInfoByToken(params) {
  return request('/api/user/getInfoByToken', { method: 'POST', data: params });
}

export async function getUserList(params) {
  return request('/api/AdminUser/query', { method: 'GET', data: params });
}

export async function addUser(params) {
  return request('/api/AdminUser/create', { method: 'POST', data: params });
}

export async function delUser(params) {
  return request('/api/AdminUser/remove', { method: 'DELETE', data: params });
}

export async function updateUser(params) {
  return request('/api/AdminUser/update', { method: 'PUT', data: params });
}
