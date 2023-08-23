import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaBcsRiesgoService } from './prisma-bcs-riesgo.service';
import { Demo } from '../@common/types/demo.type';
import { inspect } from 'node:util';

@Injectable()
export class PrismaMultiDatasourceDemoService implements Demo {
  private readonly logger = new Logger(PrismaMultiDatasourceDemoService.name);

  constructor(
    private readonly adventureWorks: PrismaService,
    private readonly bcsRiesgo: PrismaBcsRiesgoService,
  ) {}

  async run(): Promise<void> {
    await this.doQueryDifferentDatasources();
    await this.doQueryAcrossMultipleDatabaseSchemas();
    this.logger.log(`Finished ${PrismaMultiDatasourceDemoService.name}`);
  }

  private async doQueryDifferentDatasources() {
    const users = await this.bcsRiesgo.users.count();
    this.logger.log(`Database BCS-RIESGO has ${users} users`);
    const sales = await this.adventureWorks.salesOrderHeader.count();
    this.logger.log(`Database AdventureWorksLT2019_Prisma has ${sales} sales`);
  }

  private async doQueryAcrossMultipleDatabaseSchemas() {
    // Order belongs to transactional schema
    // User belongs to base schema
    const orders = await this.adventureWorks.order.findMany({
      where: {
        user: {
          id: 1,
        },
      },
    });
    this.logger.log(
      `Got ${inspect(orders)} from schemas: transactional and base`,
    );
  }
}
