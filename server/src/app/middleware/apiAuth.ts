import { IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { getRepository } from 'typeorm';
import { AdminRole } from '../model/admin_role';

export default (permissions: string[]) => {
  return async (ctx: Context, next: IMidwayWebNext): Promise<void> => {
    const tokenInfo = ctx.tokenInfo;
    const role = await getRepository(AdminRole)
      .createQueryBuilder('role')
      .where({ id: tokenInfo.roleId })
      .addSelect(['role.apiPerm', 'role.menuPerm'])
      .getOne();
    const apiPerm = JSON.parse(role.apiPerm) || [];

    const permFlag = permissions.every(item => {
      return apiPerm.includes(item);
    });

    if (!permFlag) {
      throw ctx.helper.error('权限不足');
    }

    return await next();
  };
};
