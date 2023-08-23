import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { Knex } from 'knex';

export default registerAs('db-objection', (): Knex.Config => {
  const connection: Knex.MsSqlConnectionConfig = {
    server: process.env.DATABASE_OBJECTION_HOST,
    port: +process.env.DATABASE_OBJECTION_PORT,
    userName: process.env.DATABASE_OBJECTION_USER,
    password: process.env.DATABASE_OBJECTION_PASSWORD,
    database: process.env.DATABASE_OBJECTION_DATABASE,
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
