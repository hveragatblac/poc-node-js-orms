import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Connections } from './enums/connections.enum';

@Injectable()
export class KnexCachingDemoService implements Demo {
  private readonly logger = new Logger(KnexCachingDemoService.name);

  constructor(
    @InjectKnex(Connections.AdventureWorksLT2019_Knex)
    private readonly knex: Knex,
  ) {}

  async run(): Promise<void> {
    // TODO: Not provided but could be achieved extending the queryBuilder https://knexjs.org/guide/extending.html
  }
}
