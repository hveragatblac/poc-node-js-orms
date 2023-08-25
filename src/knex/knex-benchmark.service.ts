import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { random } from '../@common/utils/random.util';

export function adjustAmalgamation(amalgamation) {
  amalgamation.fBigint = (amalgamation.fBigint as bigint).toString(10);
  amalgamation.fFloat = (amalgamation.fFloat as number).toExponential();
  amalgamation.fReal = (amalgamation.fReal as number).toExponential();
}

@Injectable()
export class KnexBenchmarkService implements Benchmarkable {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run() {
    return [
      {
        name: 'Single insert',
        task: async (dto) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateArguments: () =>
          random.amalgamation({ updater: adjustAmalgamation }),
      },
      {
        name: 'Bulk insert',
        task: async (dtos) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateArguments: () =>
          random.amalgamations({ count: 2000, updater: adjustAmalgamation }),
      },
      {
        name: 'First select',
        task: async () => {},
        generateArguments: () => undefined,
      },
      {
        name: 'Unique select',
        task: async () => {},
        generateArguments: () => undefined,
      },
      {
        name: 'select',
        task: async () => {},
        generateArguments: () => undefined,
      },
      {
        name: 'Single update',
        task: async ({ dto, criterion }) => {
          await this.amalgamationService.updateFirst(dto, criterion);
        },
        generateArguments: () => {
          const dto = random.amalgamation({ updater: adjustAmalgamation });
          const criterion = { name: dto.name };
          return { dto, criterion };
        },
      },
      {
        name: 'Bulk update',
        task: async ({ dto, criterion }) => {
          await this.amalgamationService.updateMany(dto, criterion);
        },
        generateArguments: () => {
          const dtos = random.amalgamations({
            count: 2000,
            updater: adjustAmalgamation,
          });
          const names = dtos.map((u) => u.name);
          const criterion = { name: { IN: names } };
          return { dtos, criterion };
        },
      },
      {
        name: 'First delete',
        task: async (criterion) => {
          await this.amalgamationService.deleteFirst(criterion);
        },
        generateArguments: () => undefined,
      },
      {
        name: 'Bulk delete',
        task: async (criterion) => {
          await this.amalgamationService.deleteMany(criterion);
        },
        generateArguments: () => undefined,
      },
    ];
  }
}
