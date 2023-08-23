import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaBcsRiesgoService } from './prisma-bcs-riesgo.service';
import { Demo } from '../@common/types/demo.type';

@Injectable()
export class PrismaMultiDatasourceDemoService implements Demo {
  private readonly logger = new Logger(PrismaMultiDatasourceDemoService.name);

  constructor(
    private readonly adventureWorks: PrismaService,
    private readonly bcsRiesgo: PrismaBcsRiesgoService,
  ) {}

  async run(): Promise<void> {
    const users = await this.bcsRiesgo.users.count();
    this.logger.log(`Database BCS-RIESGO has ${users} users`);
    const sales = await this.adventureWorks.salesOrderHeader.count();
    this.logger.log(`Database AdventureWorksLT2019_Prisma has ${sales} sales`);
  }
}
