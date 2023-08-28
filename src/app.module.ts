import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KnexModule } from './knex/knex.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from './sequelize/sequelize.module';
import { TypeormModule } from './typeorm/typeorm.module';
import databaseAdventureWorksKnexConfiguration from './@configurations/database-adventure-works-knex.configuration';
import databaseAdventureWorksSequelizeConfiguration from './@configurations/database-adventure-works-sequelize.configuration';
import databaseBcsRiesgoKnexConfiguration from './@configurations/database-bcs-riesgo-knex.configuration';
import databaseBcsRiesgoSequelizeConfiguration from './@configurations/database-bcs-riesgo-sequelize.configuration';
import databaseAdventureWorksTypeormConfiguration from './@configurations/database-adventure-works-typeorm.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseBcsRiesgoKnexConfiguration,
        databaseBcsRiesgoSequelizeConfiguration,
        databaseAdventureWorksKnexConfiguration,
        databaseAdventureWorksSequelizeConfiguration,
        databaseAdventureWorksTypeormConfiguration,
      ],
    }),
    PrismaModule,
    KnexModule,
    SequelizeModule,
    TypeormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
