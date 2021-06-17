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

import { CreateDTO, QueryDTO, RemoveDTO, UpdateDTO } from '../dto/AdminUser';
import { AdminUserService } from '../service/AdminUser';

@Provide()
@Controller('/api/AdminUser')
export class AdminUserController {
  @Inject()
  ctx: Context;

  @Inject('adminUserService')
  adminUserService: AdminUserService;

  @Post('/create')
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
}
