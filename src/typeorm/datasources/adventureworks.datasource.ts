import 'dotenv/config';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

const datasourceOptions: any = {
  type: 'mssql',
  host: configService.get('DATABASE_TYPEORM_HOST'),
  port: +configService.get('DATABASE_TYPEORM_PORT'),
  username: configService.get('DATABASE_TYPEORM_USER'),
  password: configService.get('DATABASE_TYPEORM_PASSWORD'),
  database: configService.get('DATABASE_TYPEORM_DATABASE'),
  entities: ['src/typeorm/models/**/*.model.ts'],
  migrations: ['src/typeorm/migrations/*.ts'],
  logging: false,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const typeOrmAdventureWorksConfig: any = datasourceOptions;

export default new DataSource(datasourceOptions);
