import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('db-typeorm', (): TypeOrmModuleOptions => {
  return {
    type: 'mssql',
    host: process.env.DATABASE_TYPEORM_HOST,
    port: +process.env.DATABASE_TYPEORM_PORT,
    username: process.env.DATABASE_TYPEORM_USER,
    password: process.env.DATABASE_TYPEORM_PASSWORD,
    database: process.env.DATABASE_TYPEORM_DATABASE,
    entities: [],
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
});
