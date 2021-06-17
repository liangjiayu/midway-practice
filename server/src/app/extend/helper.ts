import { IHelper } from 'egg';
import { BASE_ERROR, SUCCESS_CODE } from '../utils/state-code';

class BaseError extends Error {
  code: number;
  details: any;
  constructor(message: string, code = BASE_ERROR.code, details = null) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export default {
  success(
    this: IHelper,
    data = null,
    message = SUCCESS_CODE.message,
    code = SUCCESS_CODE.code
  ) {
    this.ctx.status = 200;
    this.ctx.body = {
      code,
      message,
      data,
    };
  },

  error(this: IHelper, message: string, code?: number, details?: any) {
    return new BaseError(message, code, details);
  },
};