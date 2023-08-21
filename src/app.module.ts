import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoPrismaModule } from './database/prisma/demoPrismaModule';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DemoPrismaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
