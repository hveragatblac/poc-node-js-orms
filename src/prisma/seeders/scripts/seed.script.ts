import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { seeders } from '../seeders';
import * as process from 'process';
import { Seeder } from '../interface/seeder.interface';
import { SeedersModule } from '../seeders.module';

(async () => {
  const app = await NestFactory.createApplicationContext(SeedersModule);
  const logger = new Logger('Seed');

  const exit = async (code: number = 0) => {
    await app.close();
    process.exit(code);
  };

  // TODO: Improve by wrapping in a single transaction?
  for (const seeder of seeders) {
    let instance: Seeder;
    try {
      instance = app.get(seeder);
    } catch (e) {
      logger.error(`Failed to get instance of ${seeder.name}`, e);
      await exit(1);
    }

    try {
      logger.log(`Running ${seeder.name}`);
      await instance.seed();
      logger.log(`Finished seeding ${seeder.name}`);
    } catch (e) {
      logger.error(`Failed seeding ${seeder.name}`, e);
      await exit(1);
    }
  }

  await exit(0);
})();
