import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ErrorHandler implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      try {
        await next();
      } catch (err) {
        console.dir(err);
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx);

        let status = err.status || 500;

        // Joi https://joi.dev/api/?v=17.4.0#validationerror
        if (err.name === 'ValidationError') {
          status = 422;
        }
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        // const message =
        //   status === 500 && ctx.app.config.env === "prod"
        //     ? "Internal Server Error"
        //     : err.message;

        ctx.body = {
          code: err.code || 50000,
          message: err.message,
        };
        if (status === 422) {
          ctx.body.code = 50001;
          ctx.body.details = err.details;
        }
        ctx.status = status;
      }
    };
  }
}
