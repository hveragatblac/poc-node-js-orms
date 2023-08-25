import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KnexModule } from './knex/knex.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from './sequelize/sequelize.module';
import databaseAdventureWorksKnexConfiguration from './@configurations/database-adventure-works-knex.configuration';
import databaseAdventureWorksSequelizeConfiguration from './@configurations/database-adventure-works-sequelize.configuration';
import databaseBcsRiesgoKnexConfiguration from './@configurations/database-bcs-riesgo-knex.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseBcsRiesgoKnexConfiguration,
        databaseAdventureWorksKnexConfiguration,
        databaseAdventureWorksSequelizeConfiguration,
      ],
    }),
    PrismaModule,
    KnexModule,
    SequelizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
