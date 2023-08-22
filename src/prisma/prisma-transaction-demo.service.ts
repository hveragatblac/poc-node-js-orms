import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { faker } from '@faker-js/faker';
import { Prisma, User } from '@prisma/client';
import { inspect } from 'node:util';
import { Demo } from '../@common/types/demo.type';

@Injectable()
export class PrismaTransactionDemoService implements Demo {
  private readonly logger = new Logger(PrismaTransactionDemoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async run() {
    await this.doNestedWrite();
    await this.doBulkOperation();
    await this.doSequentialOperations();
    await this.doInteractive();
    this.logger.log(`Finished ${PrismaTransactionDemoService.name}`);
  }

  private async doNestedWrite() {
    const nfts = faker.helpers
      .uniqueArray(faker.internet.url, 3)
      .map((url) => ({ url }));

    const user: User = await this.prisma.user.create({
      data: {
        name: faker.internet.userName(),
        nfts: {
          create: nfts,
        },
      },
    });
    this.logger.log(
      `Created user with related entities in a single transaction ${inspect(
        user,
      )}`,
    );
  }

  private async doBulkOperation() {
    const userCount = 2000;
    const nftPerUserCount = 4;
    const nfts = faker.helpers
      .uniqueArray(faker.internet.url, nftPerUserCount * userCount)
      .map((url) => ({ url }));

    const users = faker.helpers
      .uniqueArray(faker.internet.userName, userCount)
      .map((userName, i) => ({
        name: userName,
        nfts: {
          create: nfts.slice(i, nftPerUserCount * (1 + i)),
        },
      }));

    const payload = await this.prisma.user.createMany({
      data: users,
    });

    this.logger.log(
      `Create ${payload.count} users with related fields in a single transaction`,
    );
  }

  private async doSequentialOperations() {
    const results = await this.prisma.$transaction(
      [
        this.prisma.user.create({
          data: {
            name: faker.internet.userName(),
          },
        }),
        this.prisma.user.create({
          data: {
            name: faker.internet.userName(),
          },
        }),
        this.prisma.user.create({
          data: {
            name: faker.internet.userName(),
          },
        }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
    );
    this.logger.log(
      `Ran ${results.length} inserts in a single transaction with isolation ReadCommitted`,
    );
  }

  private async doInteractive() {
    const doArbirtraryTransactionalRoutine = async (
      tx: Prisma.TransactionClient,
    ) => {
      const user1 = await tx.user.create({
        data: {
          name: faker.internet.userName(),
        },
      });
      const user2 = await tx.user.create({
        data: {
          name: faker.internet.userName(),
        },
      });
      const user3 = await tx.user.create({
        data: {
          name: faker.internet.userName(),
        },
      });
      return [user1, user2, user3];
    };
    const result = await this.prisma.$transaction(
      doArbirtraryTransactionalRoutine,
      { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
    );
    this.logger.log(
      `Ran arbitrary transactional routine in a single transaction and got ${inspect(
        result,
      )} with isolation ReadCommitted`,
    );
  }
}
