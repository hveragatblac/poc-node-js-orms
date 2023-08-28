import { Injectable } from '@nestjs/common';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { Routine } from '../../tools/benchmark/types/routine.type';
import { AmalgamationService } from './services/amalgamation.service';
import { random } from '../@common/utils/random.util';

@Injectable()
export class TypeormBenchmarkService implements Benchmarkable {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run(): Promise<Routine[]> {
    return [
      {
        name: 'Single insert',
        task: async (dto: any) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateTaskArguments: random.amalgamation,
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
    ];
  }
}
