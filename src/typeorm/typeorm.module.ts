import { Module } from '@nestjs/common';
import { TypeOrmModule as NestJsTypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AmalgamationService } from './services/amalgamation.service';
import { Amalgamation } from './models/amalgamation.model';
import { TypeormBenchmarkService } from './typeorm-benchmark.service';

@Module({
  imports: [
    NestJsTypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db-typeorm');
      },
      inject: [ConfigService],
    }),
    NestJsTypeOrmModule.forFeature([Amalgamation]),
  ],
  providers: [AmalgamationService, TypeormBenchmarkService],
})
export class TypeormModule {}
