import type { Knex } from 'knex';
import 'dotenv/config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mssql',
    connection: {
      server: process.env.DATABASE_KNEX_HOST,
      port: +process.env.DATABASE_KNEX_PORT,
      userName: process.env.DATABASE_KNEX_USER,
      password: process.env.DATABASE_KNEX_PASSWORD,
      database: process.env.DATABASE_KNEX_DATABASE,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      directory: './knex/migrations',
    },
  },
};

module.exports = config;
