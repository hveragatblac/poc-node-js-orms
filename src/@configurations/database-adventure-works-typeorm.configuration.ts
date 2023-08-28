import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmAdventureWorksConfig } from '../typeorm/datasources/adventureworks.datasource';

export default registerAs('db-typeorm', (): TypeOrmModuleOptions => {
  return typeOrmAdventureWorksConfig;
});
