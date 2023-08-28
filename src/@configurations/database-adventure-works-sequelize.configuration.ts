import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Amalgamation } from '../sequelize/models/amalgamation.model';
import { BaseUser } from '../sequelize/models/base-user.model';
import { TransactionalOrder } from '../sequelize/models/transactional-order.model';

export default registerAs('db-sequelize', (): SequelizeModuleOptions => {
  return {
    dialect: 'mssql',
    host: process.env.DATABASE_SEQUELIZE_HOST,
    port: +process.env.DATABASE_SEQUELIZE_PORT,
    username: process.env.DATABASE_SEQUELIZE_USER,
    password: process.env.DATABASE_SEQUELIZE_PASSWORD,
    database: process.env.DATABASE_SEQUELIZE_DATABASE,
    // autoLoadModels: true,
    models: [Amalgamation, BaseUser, TransactionalOrder],
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  };
});
