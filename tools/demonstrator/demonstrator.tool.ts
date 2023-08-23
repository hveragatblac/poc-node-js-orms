import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { Logger } from '@nestjs/common';
import { inspect } from 'node:util';
import * as path from 'path';
import { Demo } from '../../src/@common/types/demo.type';

function pluckServiceNameFromPath(servicePath: string) {
  return path
    .normalize(servicePath)
    .split(path.sep)
    .at(-1)
    .replace('.service.ts', '')
    .split('-')
    .map((u) => u.at(0).toUpperCase() + u.slice(1))
    .join('')
    .concat('Service');
}

(async () => {
  const logger = new Logger('Demonstrator');
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const modulePath =
      '../../src/prisma/prisma-transaction-demo.service.ts';
    const name = pluckServiceNameFromPath(modulePath);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(modulePath);
    const type = module[name];
    const instance = app.get<Demo>(type);
    await instance.run();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();
