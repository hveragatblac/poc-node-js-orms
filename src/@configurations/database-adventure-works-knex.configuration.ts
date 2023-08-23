import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { Knex } from 'knex';

export default registerAs('db-knex', (): Knex.Config => {
  const connection: Knex.MsSqlConnectionConfig = {
    server: process.env.DATABASE_KNEX_HOST,
    port: +process.env.DATABASE_KNEX_PORT,
    userName: process.env.DATABASE_KNEX_USER,
    password: process.env.DATABASE_KNEX_PASSWORD,
    database: process.env.DATABASE_KNEX_DATABASE,
    options: {
      encrypt: true,
      trustedConnection: true,
    },
  };
  return {
    client: 'mssql',
    connection,
  };
});
