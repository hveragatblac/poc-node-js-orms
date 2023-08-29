import { Injectable } from '@nestjs/common';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { Routine } from '../../tools/benchmark/types/routine.type';
import { AmalgamationService } from './services/amalgamation.service';
import { random } from '../@common/utils/random.util';
import { faker } from '@faker-js/faker';

const MAX_BIG_UINT_64 = 2n ** 64n - 1n;

// Assumes we're using precision >= 20 mode
// for scale = 10 this is 1844674407
function getMaxDecimalForScale(scale: bigint) {
  return MAX_BIG_UINT_64 / 10n ** scale;
}

const MAX_DECIMAL_30P_10S = getMaxDecimalForScale(10n);
const MIN_DECIMAL_30P_10S = -MAX_DECIMAL_30P_10S - 1n;

export function typeormAdjustAmalgamation(amalgamation) {
  // TypeORM cannot handle numbers outside this range
  amalgamation.fBigint = faker.number.bigInt({
    min: -1n * 2n ** 53n,
    max: 2n ** 53n - 1n,
  });
  amalgamation.fDecimal = random.decimal(30, 10, {
    min: MIN_DECIMAL_30P_10S,
    max: MAX_DECIMAL_30P_10S,
  });
}

@Injectable()
export class TypeormBenchmarkService implements Benchmarkable {
  private stateFirstSelect = {
    criterion: {} as Record<string, unknown>,
    amalgamations: [] as any[],
  };

  private stateSingleUpdate = {
    criterion: {} as Record<string, unknown>,
    dto: {} as Record<string, unknown>,
    amalgamations: [] as any[],
  };

  private stateBulkUpdate = {
    criterion: {} as Record<string, unknown>,
    dtos: [] as Record<string, unknown>[],
    amalgamations: [] as any[],
  };

  private stateFirstDelete = {
    criterion: {} as Record<string, unknown>,
    dto: {} as Record<string, unknown>,
    amalgamations: [] as any[],
    deletedIds: new Set<number>(),
  };

  private stateBulkDelete = {
    criterion: {} as Record<string, unknown>,
    dtos: [] as Record<string, unknown>[],
    amalgamations: [] as any[],
  };

  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run(): Promise<Routine[]> {
    return [
      {
        name: 'Single insert',
        task: async (dto) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateTaskArguments: () =>
          random.amalgamation({ updater: typeormAdjustAmalgamation }),
      },
      {
        name: 'Bulk insert',
        task: async (dtos: any) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateTaskArguments: () =>
          random.amalgamations({
            count: 2000,
            updater: typeormAdjustAmalgamation,
          }),
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
      },
      {
        name: 'First select',
        task: async () => {
          await this.amalgamationService.findFirst(
            this.stateFirstSelect.criterion,
          );
        },
        generateTaskArguments: () => undefined,
        beforeTask: async () => {
          this.stateFirstSelect.amalgamations = random.amalgamations({
            count: 2000,
            updater: typeormAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateFirstSelect.amalgamations as any,
          );
        },
        beforeMeasurement: () => {
          this.stateFirstSelect.criterion = {
            name: random.item(this.stateFirstSelect.amalgamations).name,
          };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
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
        task: async (dto) => {
          await this.amalgamationService.updateFirst(dto);
        },
        generateTaskArguments: () => {
          return this.stateSingleUpdate.dto;
        },
        beforeTask: async () => {
          this.stateSingleUpdate.amalgamations = random.amalgamations({
            count: 2000,
            updater: typeormAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateSingleUpdate.amalgamations as any,
          );
          this.stateSingleUpdate.amalgamations =
            await this.amalgamationService.find({});
        },
        beforeMeasurement: () => {
          this.stateSingleUpdate.dto = {
            fDecimal: random.decimal(30, 10, {
              min: MIN_DECIMAL_30P_10S,
              max: MAX_DECIMAL_30P_10S,
            }),
            id: random.item(this.stateSingleUpdate.amalgamations).id,
          };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
      },
      {
        name: 'Bulk update',
        task: async (dtos: any) => {
          await this.amalgamationService.updateMany(dtos);
        },
        generateTaskArguments: () => {
          return this.stateBulkUpdate.dtos;
        },
        beforeTask: async () => {
          this.stateBulkUpdate.amalgamations = random.amalgamations({
            count: 4000,
            updater: typeormAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateBulkUpdate.amalgamations as any,
          );
        },
        beforeMeasurement: () => {
          const bit = random.item(this.stateBulkUpdate.amalgamations).fBit;
          const decimal = random.decimal(30, 10, {
            min: MIN_DECIMAL_30P_10S,
            max: MAX_DECIMAL_30P_10S,
          });
          this.stateBulkUpdate.dtos = this.stateBulkUpdate.amalgamations
            .filter((u) => u.fBit === bit)
            .map((u) => ({ id: u.id, fDecimal: decimal }));
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
      },
      {
        name: 'First delete',
        task: async (dto) => {
          await this.amalgamationService.deleteFirst(dto);
        },
        generateTaskArguments: () => {
          return this.stateFirstDelete.dto;
        },
        beforeTask: async () => {
          this.stateFirstDelete.amalgamations = random.amalgamations({
            count: 4000,
            updater: typeormAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateFirstDelete.amalgamations as any,
          );
          this.stateFirstDelete.amalgamations =
            await this.amalgamationService.find({});
        },
        beforeMeasurement: () => {
          let id: number;
          do {
            id = random.item(this.stateFirstDelete.amalgamations).id;
          } while (this.stateFirstDelete.deletedIds.has(id));
          this.stateFirstDelete.deletedIds.add(id);
          this.stateFirstDelete.dto = {
            id: id,
          };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
      },
      {
        name: 'Bulk delete',
        task: async (dtos: any) => {
          await this.amalgamationService.deleteMany(dtos);
        },
        generateTaskArguments: () => {
          return this.stateBulkDelete.dtos;
        },
        beforeMeasurement: async () => {
          this.stateBulkDelete.amalgamations = random.amalgamations({
            count: 16,
            updater: typeormAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateBulkDelete.amalgamations as any,
          );
          const bit = random.item(this.stateBulkDelete.amalgamations).fBit;
          this.stateBulkDelete.dtos = this.stateBulkDelete.amalgamations
            .filter((u) => u.fBit === bit)
            .map((u) => ({ id: u.id }));
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany();
        },
      },
    ];
  }
}
