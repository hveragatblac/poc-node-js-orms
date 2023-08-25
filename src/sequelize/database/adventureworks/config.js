// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const process = require('node:process');

module.exports = {
  development: {
    dialect: 'mssql',
    host: process.env.DATABASE_SEQUELIZE_HOST,
    port: +process.env.DATABASE_SEQUELIZE_PORT,
    username: process.env.DATABASE_SEQUELIZE_USER,
    password: process.env.DATABASE_SEQUELIZE_PASSWORD,
    database: process.env.DATABASE_SEQUELIZE_DATABASE,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  },
};
