import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SalesOrderDetailService } from './services/sales-order-detail.service';
import { AmalgamationService } from './services/amalgamation.service';

@Module({
  providers: [PrismaService, SalesOrderDetailService, AmalgamationService],
  exports: [PrismaService],
})
export class PrismaModule {}
