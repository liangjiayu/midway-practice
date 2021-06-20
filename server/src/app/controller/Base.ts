import { Inject, Controller, Provide, Get } from '@midwayjs/decorator';
import { Context } from 'egg';

import {} from '../dto/Base';
import { BaseService } from '../service/Base';

@Provide()
@Controller('/api/base')
export class BaseController {
  @Inject()
  ctx: Context;

  @Inject('baseService')
  baseService: BaseService;

  @Get('/getApiPerm')
  async getApiPerm() {
    const result = await this.baseService.getApiPerm();
    this.ctx.helper.success(result);
  }
}
