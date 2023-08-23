import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SalesOrderDetailService } from './services/sales-order-detail.service';
import { AmalgamationService } from './services/amalgamation.service';
import { PrismaBenchmarkService } from './prisma-benchmark.service';
import { PrismaTransactionDemoService } from './prisma-transaction-demo.service';
import { PrismaCachingDemoService } from './prisma-caching-demo.service';

@Module({
  providers: [
    PrismaService,
    SalesOrderDetailService,
    AmalgamationService,
    PrismaBenchmarkService,
    PrismaTransactionDemoService,
    PrismaCachingDemoService,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
