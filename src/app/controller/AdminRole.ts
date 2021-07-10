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

import { CreateDTO, QueryDTO, RemoveDTO, UpdateDTO } from '../dto/AdminRole';
import { AdminRoleService } from '../service/AdminRole';
import apiAuth from '../middleware/apiAuth';

@Provide()
@Controller('/api/AdminRole')
export class AdminRoleController {
  @Inject()
  ctx: Context;

  @Inject('adminRoleService')
  adminRoleService: AdminRoleService;

  @Post('/create')
  @Validate()
  async create(@Body(ALL) params: CreateDTO) {
    const result = await this.adminRoleService.createRole(params);
    this.ctx.helper.success(result);
  }

  @Del('/remove', { middleware: [apiAuth(['AdminRole:remove']) as any] })
  @Validate()
  async remove(@Body(ALL) params: RemoveDTO) {
    const { id } = params;
    const result = await this.adminRoleService.removeRoleById(id);
    this.ctx.helper.success(result);
  }

  @Put('/update')
  @Validate()
  async update(@Body(ALL) params: UpdateDTO) {
    const result = await this.adminRoleService.updateRole(params);
    this.ctx.helper.success(result);
  }

  @Get('/query')
  @Validate()
  async query(@Query(ALL) query: QueryDTO) {
    const result = await this.adminRoleService.queryRole(query);
    this.ctx.helper.success(result);
  }
}
