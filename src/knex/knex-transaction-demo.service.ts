import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { inspect } from 'node:util';
import { Connections } from './enums/connections.enum';
import { random } from '../@common/utils/random.util';
import { adjustAmalgamation } from './knex-benchmark.service';

@Injectable()
export class KnexTransactionDemoService implements Demo {
  private readonly logger = new Logger(KnexTransactionDemoService.name);

  constructor(
    @InjectKnex(Connections.AdventureWorksLT2019_Knex)
    private readonly knex: Knex,
  ) {}

  async run(): Promise<void> {
    await this.doTransactionPromiseAware();
    await this.doTransactionDelegable();
    await this.doTransactionProvided();
    this.logger.log(`Finished ${KnexTransactionDemoService.name}`);
  }

  private async doTransactionPromiseAware() {
    const payload = await this.knex.transaction(
      async (tx) => {
        const amalgamation1 = await tx
          .withSchema('SalesLT')
          .insert(random.amalgamation({ updater: adjustAmalgamation }))
          .into('Amalgamation')
          .returning('*');
        const amalgamation2 = await tx
          .withSchema('SalesLT')
          .insert(random.amalgamation({ updater: adjustAmalgamation }))
          .into('Amalgamation')
          .returning('*');
        return [...amalgamation1, ...amalgamation2];
      },
      {
        isolationLevel: 'read committed',
      },
    );
    this.logger.log(
      `Inserted 2 amalgamations separately within a single promise aware transaction got ${inspect(
        payload,
      )}`,
    );
  }

  private async doTransactionDelegable() {
    let tx;
    const payload = [];
    try {
      tx = await this.knex.transaction({ isolationLevel: 'read committed' });
      await this.knex
        .withSchema('SalesLT')
        .insert(random.amalgamation({ updater: adjustAmalgamation }))
        .into('Amalgamation')
        .transacting(tx)
        .returning('*')
        .then((rows) => payload.push(...rows));
      await this.knex
        .withSchema('SalesLT')
        .insert(random.amalgamation({ updater: adjustAmalgamation }))
        .into('Amalgamation')
        .transacting(tx)
        .returning('*')
        .then((rows) => payload.push(...rows));
      await tx.commit();
      this.logger.log(
        `Inserted 2 amalgamations separately within a single delegable transaction, got ${inspect(
          payload,
        )}`,
      );
    } catch (e) {
      this.logger.error(`Failed doTransactionDelegable`, e);
      if (tx) {
        await tx.rollback();
        this.logger.log(`Rolled back`);
      }
    }
  }

  private async doTransactionProvided() {
    const txProvider = this.knex.transactionProvider({
      isolationLevel: 'read committed',
      readOnly: false,
    });
    const payload = [];
    let tx;
    try {
      tx = await txProvider();
      await tx
        .withSchema('SalesLT')
        .insert(random.amalgamation({ updater: adjustAmalgamation }))
        .into('Amalgamation')
        .returning('*')
        .then((rows) => payload.push(...rows));
      await tx
        .withSchema('SalesLT')
        .insert(random.amalgamation({ updater: adjustAmalgamation }))
        .into('Amalgamation')
        .returning('*')
        .then((rows) => payload.push(...rows));
      await tx.commit();
      this.logger.log(
        `Inserted 2 amalgamations separately within a single provided transaction, got ${inspect(
          payload,
        )}`,
      );
    } catch (e) {
      this.logger.error(`Failed doTransactionProvided`, e);
      if (tx) {
        await tx.rollback();
        this.logger.log(`Rolled back`);
      }
    }
  }
}
