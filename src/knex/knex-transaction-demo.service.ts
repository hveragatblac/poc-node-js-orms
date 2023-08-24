import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AmalgamationService } from './services/amalgamation.service';
import { generateAmagamationKnex } from './knex-benchmark.service';
import { inspect } from 'node:util';

@Injectable()
export class KnexTransactionDemoService implements Demo {
  private readonly logger = new Logger(KnexTransactionDemoService.name);

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    private readonly amalgamationService: AmalgamationService,
  ) {}

  async run(): Promise<void> {
    await this.doTransactionPromiseAware();
    await this.doTransactionDelegable();
    this.logger.log(`Finished ${KnexTransactionDemoService.name}`);
  }

  private async doTransactionPromiseAware() {
    const payload = await this.knex.transaction(
      async (tx) => {
        const amalgamation1 = await tx
          .withSchema('SalesLT')
          .insert(generateAmagamationKnex())
          .into('Amalgamation')
          .returning('*');
        const amalgamation2 = await tx
          .withSchema('SalesLT')
          .insert(generateAmagamationKnex())
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
        .insert(generateAmagamationKnex())
        .into('Amalgamation')
        .transacting(tx)
        .returning('*')
        .then((rows) => payload.push(...rows));
      await this.knex
        .withSchema('SalesLT')
        .insert(generateAmagamationKnex())
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
}
