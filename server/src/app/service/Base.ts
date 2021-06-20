import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import * as assert from 'assert';

import {} from '../dto/Base';
import ApiPerm from '../utils/ApiPerm';

@Provide()
export class BaseService {
  @Inject()
  ctx: Context;

  async getApiPerm() {
    return ApiPerm;
  }
}
