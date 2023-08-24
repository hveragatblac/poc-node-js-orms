import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { Connections } from './enums/connections.enum';

@Injectable()
export class KnexAdvancedQueryingService implements Demo {
  private readonly logger = new Logger(KnexAdvancedQueryingService.name);

  constructor(
    @InjectKnex(Connections.AdventureWorksLT2019_Knex)
    private readonly knex: Knex,
  ) {}

  async run(): Promise<void> {
    return undefined;
  }

  private async doQueryCtes() {}

  private async doQueryWindowFunctions() {}

  private async doQueryTemporalTableJoins() {}

  private async doQueryGrouping() {}

  private async doQueryHierarchical() {}

  private async doQueryRecursive() {}
}
