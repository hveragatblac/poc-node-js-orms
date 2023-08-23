import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ObjectionModule } from './objection/objection.module';
import { KnexModule } from './knex/knex.module';
import { ConfigModule } from '@nestjs/config';
import databaseAdventureWorksKnexConfiguration from './@configurations/database-adventure-works-knex.configuration';
import databaseAdventureWorksObjectionConfiguration from './@configurations/database-adventure-works-objection.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseAdventureWorksKnexConfiguration,
        databaseAdventureWorksObjectionConfiguration,
      ],
    }),
    PrismaModule,
    ObjectionModule,
    KnexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
