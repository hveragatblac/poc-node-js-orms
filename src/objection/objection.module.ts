import { Module } from '@nestjs/common';
import { ObjectionService } from './objection.service';

@Module({
  providers: [ObjectionService]
})
export class ObjectionModule {}
