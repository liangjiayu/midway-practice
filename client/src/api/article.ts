import { request } from 'umi';

export async function getArticleList(params) {
  return request('/api/article/list', { method: 'POST', data: params });
}

export async function addArticle(params) {
  return request('/api/article/create', { method: 'POST', data: params });
}

export async function getArticleInfo(params) {
  return request('/api/article/detail', { method: 'POST', data: params });
}

export async function delArticle(params) {
  return request('/api/article/del', { method: 'POST', data: params });
}

export async function updateArticleInfo(params) {
  return request('/api/article/update', { method: 'POST', data: params });
}
