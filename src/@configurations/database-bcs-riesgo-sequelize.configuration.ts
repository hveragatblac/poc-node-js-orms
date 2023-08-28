import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../sequelize/models/user.model';

export default registerAs(
  'db-bcs-riesgo-sequelize',
  (): SequelizeModuleOptions => {
    return {
      dialect: 'mssql',
      host: process.env.DATABASE_SEQUELIZE_BCS_RIESGO_HOST,
      port: +process.env.DATABASE_SEQUELIZE_BCS_RIESGO_PORT,
      username: process.env.DATABASE_SEQUELIZE_BCS_RIESGO_USER,
      password: process.env.DATABASE_SEQUELIZE_BCS_RIESGO_PASSWORD,
      database: process.env.DATABASE_SEQUELIZE_BCS_RIESGO_DATABASE,
      // autoLoadModels: true,
      models: [User],
      dialectOptions: {
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
      },
    };
  },
);
