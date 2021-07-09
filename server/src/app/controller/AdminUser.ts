import {
  Inject,
  Controller,
  Post,
  Provide,
  Query,
  Get,
  ALL,
  Validate,
  Body,
  Del,
  Put,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import {
  CreateDTO,
  QueryDTO,
  RemoveDTO,
  UpdateDTO,
  LoginDTO,
} from '../dto/AdminUser';
import { AdminUserService } from '../service/AdminUser';
import apiAuth from '../middleware/apiAuth';

@Provide()
@Controller('/api/AdminUser')
export class AdminUserController {
  @Inject()
  ctx: Context;

  @Inject('adminUserService')
  adminUserService: AdminUserService;

  @Post('/create', {
    // middleware: [apiAuth(['AdminUser:create1']) as any],
  })
  @Validate()
  async create(@Body(ALL) params: CreateDTO) {
    const result = await this.adminUserService.createUser(params);
    this.ctx.helper.success(result);
  }

  @Del('/remove')
  @Validate()
  async remove(@Body(ALL) params: RemoveDTO) {
    const { id } = params;
    const result = await this.adminUserService.removeUserById(id);
    return result;
  }

  @Put('/update')
  @Validate()
  async update(@Body(ALL) params: UpdateDTO) {
    const result = await this.adminUserService.updateUser(params);
    return result;
  }

  @Get('/query')
  @Validate()
  async query(@Query(ALL) query: QueryDTO) {
    const result = await this.adminUserService.queryUser(query);
    this.ctx.helper.success(result);
  }

  @Post('/login')
  @Validate()
  async login(@Body(ALL) params: LoginDTO) {
    const result = await this.adminUserService.signIn(params);
    this.ctx.helper.success(result);
  }

  @Get('/getUserInfo')
  @Validate()
  async getUserInfo() {
    const result = await this.adminUserService.getUserInfo();
    this.ctx.helper.success(result);
  }
}
