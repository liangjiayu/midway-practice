import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1623755155398_3213';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.validate = {
  //   allowUnknown: true,
  // };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 数据库配置
  config.orm = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_HOST || 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1013834609',
    database: process.env.MYSQL_DATABASE || 'egg',
    synchronize: true,
    logging: false,
    timezone: '+08:00',
  };

  return config;
};
