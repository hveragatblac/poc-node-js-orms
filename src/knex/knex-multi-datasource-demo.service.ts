import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Connections } from './enums/connections.enum';
import { inspect } from 'node:util';

@Injectable()
export class KnexMultiDatasourceDemoService implements Demo {
  private readonly logger = new Logger(KnexMultiDatasourceDemoService.name);

  constructor(
    @InjectKnex(Connections.AdventureWorksLT2019_Knex)
    private readonly adventureWorks: Knex,
    @InjectKnex(Connections.BcsRiesgo)
    private readonly bcsRiesgo: Knex,
  ) {}

  async run(): Promise<void> {
    await this.doQueryDifferentDatasources();
    await this.doQueryAcrossMultipleDatabaseSchemas();
    this.logger.log(`Finished ${KnexMultiDatasourceDemoService.name}`);
  }

  private async doQueryDifferentDatasources() {
    const users = await this.bcsRiesgo
      .withSchema('dbo')
      .from('users')
      .count('id as total')
      .first();
    this.logger.log(`Database BCS-RIESGO has ${users.total} users`);
    const sales = await this.adventureWorks
      .withSchema('SalesLT')
      .from('SalesOrderHeader')
      .count('SalesOrderID as total')
      .first();
    this.logger.log(
      `Database AdventureWorksLT2019_Prisma has ${sales.total} sales`,
    );
  }

  private async doQueryAcrossMultipleDatabaseSchemas() {
    // Order belongs to transactional schema
    // User belongs to base schema
    const orders = await this.adventureWorks
      .select('order.*', 'user.id as joinedUserId')
      .from('transactional.Order as order')
      .innerJoin('base.User as user', 'user.id', 'order.userId');
    this.logger.log(
      `Got ${inspect(orders)} from schemas: transactional and base`,
    );
  }
}
