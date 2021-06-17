import { request } from 'umi';

export async function checkOnly(params) {
  return request('/api/base/checkOnly', { method: 'POST', data: params });
}
