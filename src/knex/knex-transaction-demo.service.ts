import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { inspect } from 'node:util';

@Injectable()
export class KnexTransactionDemoService implements Demo {
  private readonly logger = new Logger(KnexTransactionDemoService.name);

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async run(): Promise<void> {
    const users = await this.knex.select().withSchema('SalesLT').from('user');
    this.logger.log(`Got ${inspect(users)}`);
  }
}
