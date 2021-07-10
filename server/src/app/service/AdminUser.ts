import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, Like } from 'typeorm';
import { Context } from 'egg';
import * as assert from 'assert';
import * as jwt from 'jsonwebtoken';

import { AdminUser } from '../model/admin_user';
import { AdminRole } from '../model/admin_role';
import { CreateDTO, QueryDTO, UpdateDTO, LoginDTO } from '../dto/AdminUser';

@Provide()
export class AdminUserService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(AdminUser)
  adminUserModel: Repository<AdminUser>;

  async createUser(params: CreateDTO) {
    const user = new AdminUser();
    const role = new AdminRole();

    role.id = params.roleId;
    user.role = role;
    this.adminUserModel.merge(user, params);

    return await this.adminUserModel.save(user);
  }

  async removeUserById(id: number) {
    const record = await this.adminUserModel.findOne(id);

    assert.ok(record, this.ctx.helper.error('暂无该用户'));
    return await this.adminUserModel.remove(record);
  }

  async updateUser(params: UpdateDTO) {
    const { id, roleId, ...column } = params;
    const role = new AdminRole();
    const user = await this.adminUserModel.findOne(id);

    if (roleId) {
      role.id = roleId;
      user.role = role;
    }

    assert.ok(user, this.ctx.helper.error('暂无该用户'));
    this.adminUserModel.merge(user, column);

    return await this.adminUserModel.save(user);
  }

  async queryUser(query: QueryDTO) {
    return await this.adminUserModel
      .createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.role', 'role')
      .getMany();
  }

  async signIn(params: LoginDTO) {
    const { username, password } = params;
    const secretKey = this.ctx.app.config.jwt.secretKey;
    const expiresIn = this.ctx.app.config.jwt.expiresIn;

    const user = await this.adminUserModel
      .createQueryBuilder('user')
      .where({ username })
      .leftJoinAndSelect('user.role', 'role')
      .addSelect(['user.password'])
      .getOne();

    assert.ok(user, this.ctx.helper.error('用户不存在'));
    assert.ok(user.password === password, this.ctx.helper.error('密码不正确'));

    const token = jwt.sign(
      { userId: user.id, roleId: user.role.id },
      secretKey,
      {
        expiresIn: expiresIn,
      }
    );

    return { token };
  }

  async getUserInfo() {
    const { userId } = this.ctx.tokenInfo;

    const user = this.adminUserModel
      .createQueryBuilder('uesr')
      .where({ id: userId })
      .leftJoinAndSelect('uesr.role', 'role')
      .addSelect(['role.menuPerm', 'role.apiPerm'])
      .getOne();

    return user;
  }
}
