import { Module } from '@nestjs/common';
import { KnexTransactionDemoService } from './knex-transaction-demo.service';
import { KnexModule as NestJsKnexModule } from 'nestjs-knex';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestJsKnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db-knex');
      },
    }),
  ],
  providers: [KnexTransactionDemoService],
})
export class KnexModule {}
