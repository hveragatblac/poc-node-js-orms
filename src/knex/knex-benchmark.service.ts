import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { generateAmalgamation } from '../@common/utils/random.util';
import { inspect } from 'node:util';

@Injectable()
export class KnexBenchmarkService implements Benchmarkable {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run() {
    return [
      {
        name: 'Single insert',
        task: async (dto) => {
          dto.fBigint = (dto.fBigint as bigint).toString(10);
          dto.fFloat = (dto.fFloat as number).toExponential();
          dto.fReal = (dto.fReal as number).toExponential();
          await this.amalgamationService.saveOne(dto);
        },
        generateArguments: generateAmalgamation,
      },
      // {
      //   name: 'Bulk insert',
      //   task: async (dtos) => {
      //     await this.amalgamationService.saveMany(dtos);
      //   },
      //   generateArguments: () =>
      //     Array.from({ length: 2000 }).map(generateAmalgamation),
      // },
      // {
      //   name: 'First select',
      //   task: async () => {},
      //   generateArguments: () => undefined,
      // },
      // {
      //   name: 'Unique select',
      //   task: async () => {},
      //   generateArguments: () => undefined,
      // },
      // {
      //   name: 'select',
      //   task: async () => {},
      //   generateArguments: () => undefined,
      // },
      // {
      //   name: 'Single update',
      //   task: async ({ dto, criterion }) => {
      //     await this.amalgamationService.updateFirst(dto, criterion);
      //   },
      //   generateArguments: () => {
      //     const dto = generateAmalgamation();
      //     const criterion = { name: dto.name };
      //     return { dto, criterion };
      //   },
      // },
      // {
      //   name: 'Bulk update',
      //   task: async ({ dto, criterion }) => {
      //     await this.amalgamationService.updateMany(dto, criterion);
      //   },
      //   generateArguments: () => {
      //     const dtos = Array.from({ length: 2000 });
      //     const names = Array.from({ length: 2000 });
      //     for (let i = 0; i < dtos.length; i++) {
      //       dtos[i] = generateAmalgamation();
      //       names[i] = (dtos[i] as any).name;
      //     }
      //     const criterion = { name: { IN: names } };
      //     return { dtos, criterion };
      //   },
      // },
      // {
      //   name: 'First delete',
      //   task: async (criterion) => {
      //     await this.amalgamationService.deleteFirst(criterion);
      //   },
      //   generateArguments: () => undefined,
      // },
      // {
      //   name: 'Bulk delete',
      //   task: async (criterion) => {
      //     await this.amalgamationService.deleteMany(criterion);
      //   },
      //   generateArguments: () => undefined,
      // },
    ];
  }
}
