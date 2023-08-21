import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SalesOrderDetailService } from './services/sales-order-detail.service';

@Module({
  providers: [PrismaService, SalesOrderDetailService],
})
export class PrismaModule {}
