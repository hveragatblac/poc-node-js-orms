import { Logger, Module } from '@nestjs/common';
import { KnexTransactionDemoService } from './knex-transaction-demo.service';
import { KnexModule as NestJsKnexModule } from 'nestjs-knex';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { inspect } from 'node:util';

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
  providers: [KnexTransactionDemoService],
})
export class KnexModule {}