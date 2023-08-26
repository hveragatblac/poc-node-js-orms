import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { Sequelize } from 'sequelize-typescript';
import { Amalgamation } from './models/amalgamation.model';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { random } from '../@common/utils/random.util';
import { sequelizeAdjustAmalgamation } from './sequelize-benchmark.service';
import ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS;

@Injectable()
export class SequelizeTransactionDemoService implements Demo {
  private readonly logger = new Logger(SequelizeTransactionDemoService.name);

  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Amalgamation)
    private readonly amalgamationModel: typeof Amalgamation,
  ) {}

  async run(): Promise<void> {
    await this.doUnmanagedTransaction();
    this.logger.log(`Finished ${SequelizeTransactionDemoService.name}`);
  }

  private async doUnmanagedTransaction() {
    const tx = await this.sequelize.transaction({
      isolationLevel: ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const amalgamation1 = await this.amalgamationModel.create(
        random.amalgamation({ updater: sequelizeAdjustAmalgamation }),
        { transaction: tx },
      );
      const amalgamation2 = await this.amalgamationModel.create(
        random.amalgamation({ updater: sequelizeAdjustAmalgamation }),
        { transaction: tx },
      );
      await tx.commit();
      this.logger.log(
        `Created 2 amalgamations within a single unmanaged transaction`,
        amalgamation1,
        amalgamation2,
      );
    } catch (e) {
      await tx.rollback();
      this.logger.error(
        `Failed to create 2 amalgamations within a single unmanaged transaction`,
        e,
      );
    }
  }

  private async doManagedTransaction() {
    try {
      const result = await this.sequelize.transaction(async (tx) => {
        const amalgamation1 = await this.amalgamationModel.create(
          random.amalgamation({ updater: sequelizeAdjustAmalgamation }),
          { transaction: tx },
        );
        const amalgamation2 = await this.amalgamationModel.create(
          random.amalgamation({ updater: sequelizeAdjustAmalgamation }),
          { transaction: tx },
        );
        return [amalgamation1, amalgamation2];
      });
      this.logger.log(
        `Created 2 amalgamations within a single unmanaged transaction`,
        result,
      );
    } catch (e) {
      this.logger.error(
        `Failed to create 2 amalgamations within a single unmanaged transaction`,
        e,
      );
    }
  }
}
