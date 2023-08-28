import { Module } from '@nestjs/common';
import { SequelizeModule as NestJsSequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmalgamationService } from './services/amalgamation.service';
import { SequelizeTransactionDemoService } from './sequelize-transaction-demo.service';
import { Amalgamation } from './models/amalgamation.model';
import { SequelizeBenchmarkService } from './sequelize-benchmark.service';
import { SequelizeMultiDatasourceDemoService } from './sequelize-multi-datasource-demo.service';
import { User } from './models/user.model';
import { BaseUser } from './models/base-user.model';
import { TransactionalOrder } from './models/transactional-order.model';

@Module({
  imports: [
    ConfigModule,
    NestJsSequelizeModule.forRootAsync({
      name: 'adventureworks',
      useFactory: (configService: ConfigService) => {
        return configService.get('db-sequelize');
      },
      inject: [ConfigService],
    }),
    NestJsSequelizeModule.forFeature(
      [Amalgamation, BaseUser, TransactionalOrder],
      'adventureworks',
    ),

    NestJsSequelizeModule.forRootAsync({
      name: 'bcsriesgo',
      useFactory: (configService: ConfigService) => {
        return configService.get('db-bcs-riesgo-sequelize');
      },
      inject: [ConfigService],
    }),
    NestJsSequelizeModule.forFeature([User], 'bcsriesgo'),
  ],
  providers: [
    AmalgamationService,
    SequelizeTransactionDemoService,
    SequelizeBenchmarkService,
    SequelizeMultiDatasourceDemoService,
  ],
})
export class SequelizeModule {}
