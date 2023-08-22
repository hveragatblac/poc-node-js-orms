import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SalesOrderDetailService } from './services/sales-order-detail.service';
import { AmalgamationService } from './services/amalgamation.service';
import { PrismaBenchmarkService } from './prisma-benchmark.service';

@Module({
  providers: [
    PrismaService,
    SalesOrderDetailService,
    AmalgamationService,
    PrismaBenchmarkService,
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
