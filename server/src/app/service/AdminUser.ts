import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like } from 'typeorm';
import { Context } from 'egg';
import * as assert from 'assert';

import { AdminUser } from '../model/admin_user';
import { CreateDTO, QueryDTO, UpdateDTO } from '../dto/AdminUser';

@Provide()
export class AdminUserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(AdminUser)
  adminUserModel: Repository<AdminUser>;

  async createUser(params: CreateDTO) {
    const user = new AdminUser();
    this.adminUserModel.merge(user, params);

    return await this.adminUserModel.save(user);
  }

  async removeUserById(id: number) {
    const record = await this.adminUserModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无该用户'));

    return await this.adminUserModel.remove(record);
  }

  async updateUser(params: UpdateDTO) {
    const { id, ...column } = params;
    const record = await this.adminUserModel.findOne(id);
    assert.ok(record, this.ctx.helper.error('暂无该用户'));

    this.adminUserModel.merge(record, column);
    return await this.adminUserModel.save(record);
  }

  async queryUser(query: QueryDTO) {
    return await this.adminUserModel.find();
  }
}
