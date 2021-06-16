import { IHelper } from 'egg';

class BaseError extends Error {
  code: number;
  details: any;
  constructor(message: string, code = 50000, details = null) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export default {
  success(this: IHelper, data = null, message = '请求成功', code = 20000) {
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
