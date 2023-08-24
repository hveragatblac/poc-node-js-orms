import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { generateAmalgamation } from '../@common/utils/random.util';

export function generateAmagamationKnex() {
  const amalgamation = generateAmalgamation();
  amalgamation.fBigint = (amalgamation.fBigint as bigint).toString(10);
  amalgamation.fFloat = (amalgamation.fFloat as number).toExponential();
  amalgamation.fReal = (amalgamation.fReal as number).toExponential();
  return amalgamation;
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
        generateArguments: generateAmagamationKnex,
      },
      {
        name: 'Bulk insert',
        task: async (dtos) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateArguments: () =>
          Array.from({ length: 2000 }).map(generateAmagamationKnex),
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
          const dto = generateAmagamationKnex();
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
          const dtos = Array.from({ length: 2000 });
          const names = Array.from({ length: 2000 });
          for (let i = 0; i < dtos.length; i++) {
            dtos[i] = generateAmagamationKnex();
            names[i] = (dtos[i] as any).name;
          }
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
