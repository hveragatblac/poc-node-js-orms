import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import {
  generateAmalgamation,
  generateAmalgamations,
} from '../@common/utils/random.util';
import { Routine } from '../../tools/benchmark/types/routine.type';

@Injectable()
export class PrismaBenchmarkService implements Benchmarkable {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run(): Promise<Routine[]> {
    return [
      {
        name: 'Single insert',
        task: async (dto: any) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateTaskArguments: generateAmalgamation,
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'Bulk insert',
        task: async (dtos: any) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateTaskArguments: () => generateAmalgamations({ count: 2000 }),
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'First select',
        task: async () => {},
        generateTaskArguments: () => undefined,
      },
      {
        name: 'Unique select',
        task: async () => {},
        generateTaskArguments: () => undefined,
      },
      {
        name: 'select',
        task: async () => {},
        generateTaskArguments: () => undefined,
      },
      {
        name: 'Single update',
        task: async ({ dto, criterion }) => {
          await this.amalgamationService.updateFirst(dto, criterion);
        },
        generateTaskArguments: () => {
          const dto = generateAmalgamation();
          const criterion = { name: dto.name };
          return { dto, criterion };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'Bulk update',
        task: async ({ dto, criterion }) => {
          await this.amalgamationService.updateMany(dto, criterion);
        },
        generateTaskArguments: () => {
          const dtos = Array.from({ length: 2000 });
          const names = Array.from({ length: 2000 });
          for (let i = 0; i < dtos.length; i++) {
            dtos[i] = generateAmalgamation();
            names[i] = (dtos[i] as any).name;
          }
          const criterion = { name: { IN: names } };
          return { dtos, criterion };
        },
      },
      {
        name: 'First delete',
        task: async (criterion: any) => {
          await this.amalgamationService.deleteFirst(criterion);
        },
        generateTaskArguments: () => undefined,
      },
      {
        name: 'Bulk delete',
        task: async (criterion) => {
          await this.amalgamationService.deleteMany(criterion);
        },
        generateTaskArguments: () => undefined,
      },
    ];
  }
}
