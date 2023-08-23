import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAdvancedQueryingService implements Demo {
  private readonly logger = new Logger(PrismaAdvancedQueryingService.name);

  constructor(private readonly prisma: PrismaService) {}

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
