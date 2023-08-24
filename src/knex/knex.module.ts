import { Module } from '@nestjs/common';
import { KnexTransactionDemoService } from './knex-transaction-demo.service';
import { KnexModule as NestJsKnexModule } from 'nestjs-knex';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmalgamationService } from './services/amalgamation.service';
import { KnexBenchmarkService } from './knex-benchmark.service';
import { Connections } from './enums/connections.enum';
import { KnexMultiDatasourceDemoService } from './knex-multi-datasource-demo.service';

@Module({
  imports: [
    ConfigModule,
    NestJsKnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          return {
            config: configService.get('db-knex'),
          };
        },
        inject: [ConfigService],
      },
      Connections.AdventureWorksLT2019_Knex,
    ),
    NestJsKnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          return {
            config: configService.get('db-bcs-riesgo-knex'),
          };
        },
        inject: [ConfigService],
      },
      Connections.BcsRiesgo,
    ),
  ],
  providers: [
    AmalgamationService,
    KnexTransactionDemoService,
    KnexMultiDatasourceDemoService,
    KnexBenchmarkService,
  ],
})
export class KnexModule {}
