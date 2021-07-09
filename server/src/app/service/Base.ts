import { Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import * as assert from 'assert';

import {} from '../dto/Base';
import apiPermissions from '../utils/apiPermissions';

@Provide()
export class BaseService {
  @Inject()
  ctx: Context;

  async getApiPerm() {
    return apiPermissions;
  }
}
