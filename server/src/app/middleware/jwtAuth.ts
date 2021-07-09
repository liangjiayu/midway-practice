import { IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';
import { TOKEN_ERROR } from '../utils/stateCode';

export default () => {
  return async (ctx: Context, next: IMidwayWebNext): Promise<void> => {
    // return await next();
    const whiteList = ctx.app.config.jwt.whiteList;
    if (whiteList.includes(ctx.url)) {
      return await next();
    }
    const secretKey = ctx.app.config.jwt.secretKey;
    let token = '';

    if (
      ctx.headers.authorization &&
      ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.accesstoken) {
      token = ctx.query.accesstoken;
    } else if (ctx.request.body.accesstoken) {
      token = ctx.request.body.accesstoken;
    }

    try {
      const tokenInfo = jwt.verify(token, secretKey);
      /**
       * token 通常包括对信息
       * {roleId:1,userId:1,iat:*****, }
       */
      ctx.tokenInfo = tokenInfo;
      await next();
    } catch (error) {
      ctx.helper.resultError(TOKEN_ERROR.message, TOKEN_ERROR.code);
    }
  };
};
