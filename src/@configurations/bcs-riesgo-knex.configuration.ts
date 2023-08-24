import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { Knex } from 'knex';

export default registerAs('db-bcs-riesgo-knex', (): Knex.Config => {
  const connection: Knex.MsSqlConnectionConfig = {
    server: process.env.DATABASE_KNEX_BCS_RIESGO_HOST,
    port: +process.env.DATABASE_KNEX_BCS_RIESGO_PORT,
    userName: process.env.DATABASE_KNEX_BCS_RIESGO_USER,
    password: process.env.DATABASE_KNEX_BCS_RIESGO_PASSWORD,
    database: process.env.DATABASE_KNEX_BCS_RIESGO_DATABASE,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
  return {
    client: 'mssql',
    connection,
  };
});
