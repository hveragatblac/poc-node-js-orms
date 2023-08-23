import { Injectable } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class KnexTransactionDemoService implements Demo {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async run(): Promise<void> {
    // this.knex.table('nft')
  }
}
