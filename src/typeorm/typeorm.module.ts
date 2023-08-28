import { Module } from '@nestjs/common';
import { TypeOrmModule as NestJsTypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestJsTypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db-typeorm');
      },
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
