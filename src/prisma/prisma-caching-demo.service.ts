import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaCachingDemoService implements Demo {
  private readonly logger = new Logger(PrismaCachingDemoService.name);

  constructor(private readonly prisma: PrismaService) {}

  async run(): Promise<void> {
    // TODO: Not provided but it's registered as a feature request, https://github.com/prisma/prisma/issues/3165
    // TODO: Still, compare time of different queries to see if SQL Server caches anything
  }
}
