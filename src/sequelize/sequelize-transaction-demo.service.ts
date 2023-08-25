import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Demo } from '../@common/types/demo.type';
import { inspect } from 'node:util';

@Injectable()
export class SequelizeTransactionDemoService implements Demo {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run(): Promise<void> {
    const res = await this.amalgamationService.create();
    console.log(inspect(res));
  }
}
