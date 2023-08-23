import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SalesOrderDetailService } from './services/sales-order-detail.service';
import { AmalgamationService } from './services/amalgamation.service';
import { PrismaBenchmarkService } from './prisma-benchmark.service';
import { PrismaTransactionDemoService } from './prisma-transaction-demo.service';
import { PrismaCachingDemoService } from './prisma-caching-demo.service';
import { PrismaBcsRiesgoService } from './prisma-bcs-riesgo.service';
import { PrismaMultiDatasourceDemoService } from './prisma-multi-datasource-demo.service';
import { PrismaAdvancedQueryingService } from './prisma-advanced-querying.service';

@Module({
  providers: [
    PrismaService,
    SalesOrderDetailService,
    AmalgamationService,
    PrismaBenchmarkService,
    PrismaTransactionDemoService,
    PrismaCachingDemoService,
    PrismaBcsRiesgoService,
    PrismaMultiDatasourceDemoService,
    PrismaAdvancedQueryingService,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
