import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { seeders } from './seeders';

@Module({
  imports: [PrismaModule],
  providers: seeders,
})
export class SeedersModule {}
