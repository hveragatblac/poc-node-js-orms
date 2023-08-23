import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma-bcs-riesgo/generated/client';

@Injectable()
export class PrismaBcsRiesgoService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    await this.$connect();
  }

  async onModuleInit() {
    await this.$disconnect();
  }
}
