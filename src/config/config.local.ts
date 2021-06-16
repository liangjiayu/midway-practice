import { ConnectionOptions } from 'typeorm';

// 数据库配置
export const orm: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1013834609',
  database: 'egg',
  synchronize: false,
  logging: false,
};

export const security = {
  csrf: false,
};
