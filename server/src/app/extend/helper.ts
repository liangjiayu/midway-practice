import { IHelper } from 'egg';
import { BASE_ERROR, SUCCESS_CODE } from '../utils/stateCode';

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

  resultError(
    this: IHelper,
    message = BASE_ERROR.message,
    code = BASE_ERROR.code,
    status = 500,
    data = null
  ) {
    this.ctx.status = status;
    this.ctx.body = {
      code,
      message,
      data,
    };
  },
};
