import { Module } from '@nestjs/common';
import { KnexTransactionDemoService } from './knex-transaction-demo.service';
import { KnexModule as NestJsKnexModule } from 'nestjs-knex';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmalgamationService } from './services/amalgamation.service';
import { KnexBenchmarkService } from './knex-benchmark.service';

@Module({
  imports: [
    ConfigModule,
    NestJsKnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          config: configService.get('db-knex'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AmalgamationService,
    KnexTransactionDemoService,
    KnexBenchmarkService,
  ],
})
export class KnexModule {}
