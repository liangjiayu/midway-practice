import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like } from 'typeorm';
import { Context } from 'egg';
import * as assert from 'assert';

import { AdminRole } from '../model/admin_role';
import { CreateDTO, QueryDTO, UpdateDTO } from '../dto/AdminRole';

@Provide()
export class AdminRoleService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(AdminRole)
  adminRoleModel: Repository<AdminRole>;

  async createRole(params: CreateDTO) {
    const role = new AdminRole();
    this.adminRoleModel.merge(role, params);

    return await this.adminRoleModel.save(role);
  }

  async removeRoleById(id: number) {
    const record = await this.adminRoleModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无该角色'));

    return await this.adminRoleModel.remove(record);
  }

  async updateRole(params: UpdateDTO) {
    const { id, ...column } = params;
    const record = await this.adminRoleModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无该用户'));

    this.adminRoleModel.merge(record, column);
    return await this.adminRoleModel.save(record);
  }

  async queryRole(query: QueryDTO) {
    return await this.adminRoleModel.find();
  }
}
