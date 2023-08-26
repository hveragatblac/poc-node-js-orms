import { Module } from '@nestjs/common';
import { SequelizeModule as NestJsSequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmalgamationService } from './services/amalgamation.service';
import { SequelizeTransactionDemoService } from './sequelize-transaction-demo.service';
import { Amalgamation } from './models/amalgamation.model';
import { SequelizeBenchmarkService } from './sequelize-benchmark.service';

@Module({
  imports: [
    ConfigModule,
    NestJsSequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db-sequelize');
      },
      inject: [ConfigService],
    }),
    NestJsSequelizeModule.forFeature([Amalgamation]),
  ],
  providers: [AmalgamationService, SequelizeTransactionDemoService, SequelizeBenchmarkService],
})
export class SequelizeModule {}
