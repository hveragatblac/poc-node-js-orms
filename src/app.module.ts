import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ObjectionModule } from './objection/objection.module';

@Module({
  imports: [PrismaModule, ObjectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
