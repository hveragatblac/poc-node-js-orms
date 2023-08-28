import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';

@Injectable()
export class SequelizeCachingDemoService implements Demo {
  private readonly logger = new Logger(SequelizeCachingDemoService.name);

  constructor(
    @InjectConnection('adventureworks')
    private readonly sequelize: Sequelize,
  ) {}

  run(): Promise<void> | void {
    // TODO: Not provided but there is a plugin that handles it, https://github.com/sequelize-transparent-cache/sequelize-transparent-cache
  }
}
