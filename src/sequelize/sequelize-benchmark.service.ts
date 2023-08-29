import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { Routine } from '../../tools/benchmark/types/routine.type';
import { random } from '../@common/utils/random.util';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';
import { AmalgamationService } from './services/amalgamation.service';

export function sequelizeAdjustAmalgamation(amalgamation) {
  amalgamation.fFloat = (amalgamation.fFloat as number).toExponential();
  amalgamation.fReal = (amalgamation.fReal as number).toExponential();
  amalgamation.fDate = format(amalgamation.fDate, 'yyyy-MM-dd');
  amalgamation.fDatetime = format(
    amalgamation.fDatetime,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fDatetime2 = format(
    amalgamation.fDatetime2,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fDatetimeoffset = format(
    amalgamation.fDatetimeoffset,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fSmalldatetime = format(
    amalgamation.fSmalldatetime,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fTime = format(amalgamation.fTime, 'hh:mm:ss');
}

@Injectable()
export class SequelizeBenchmarkService implements Benchmarkable {
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
    dto: {} as Record<string, unknown>,
    amalgamations: [] as any[],
  };

  private stateFirstDelete = {
    criterion: {} as Record<string, unknown>,
    amalgamations: [] as any[],
    deletedIds: new Set<number>(),
  };

  private stateBulkDelete = {
    criterion: {} as Record<string, unknown>,
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
          random.amalgamation({ updater: sequelizeAdjustAmalgamation }),
      },
      {
        name: 'Bulk insert',
        task: async (dtos: any) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateTaskArguments: () =>
          random.amalgamations({
            count: 2000,
            updater: sequelizeAdjustAmalgamation,
          }),
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'First select',
        task: async () => {
          await this.amalgamationService.findFirst(this.stateFirstSelect.criterion);
        },
        generateTaskArguments: () => undefined,
        beforeTask: async () => {
          this.stateFirstSelect.amalgamations = random.amalgamations({
            count: 2000,
            updater: sequelizeAdjustAmalgamation,
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
          await this.amalgamationService.deleteMany({});
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
        task: async ({ dto, criterion }) => {
          await this.amalgamationService.updateFirst(dto, criterion);
        },
        generateTaskArguments: () => {
          return {
            dto: this.stateSingleUpdate.dto,
            criterion: this.stateSingleUpdate.criterion,
          };
        },
        beforeTask: async () => {
          this.stateSingleUpdate.amalgamations = random.amalgamations({
            count: 2000,
            updater: sequelizeAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateSingleUpdate.amalgamations as any,
          );
          this.stateSingleUpdate.amalgamations =
            await this.amalgamationService.find({});
        },
        beforeMeasurement: () => {
          this.stateSingleUpdate.criterion = {
            id: random.item(this.stateSingleUpdate.amalgamations).id,
          };
          this.stateSingleUpdate.dto = { fDecimal: random.decimal(30, 10) };
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
          return {
            dto: this.stateBulkUpdate.dto,
            criterion: this.stateBulkUpdate.criterion,
          };
        },
        beforeTask: async () => {
          this.stateBulkUpdate.amalgamations = random.amalgamations({
            count: 4000,
            updater: sequelizeAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateBulkUpdate.amalgamations as any,
          );
        },
        beforeMeasurement: () => {
          this.stateBulkUpdate.criterion = {
            fBit: random.item(this.stateBulkUpdate.amalgamations).fBit,
          };
          this.stateBulkUpdate.dto = { fDecimal: random.decimal(30, 10) };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'First delete',
        task: async (criterion) => {
          await this.amalgamationService.deleteFirst(criterion);
        },
        generateTaskArguments: () => {
          return this.stateFirstDelete.criterion;
        },
        beforeTask: async () => {
          this.stateFirstDelete.amalgamations = random.amalgamations({
            count: 4000,
            updater: sequelizeAdjustAmalgamation,
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
          this.stateFirstDelete.criterion = {
            id: id,
          };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
      {
        name: 'Bulk delete',
        task: async (criterion) => {
          await this.amalgamationService.deleteMany(criterion);
        },
        generateTaskArguments: () => {
          return this.stateBulkDelete.criterion;
        },
        beforeMeasurement: async () => {
          this.stateBulkDelete.amalgamations = random.amalgamations({
            count: 16,
            updater: sequelizeAdjustAmalgamation,
          });
          await this.amalgamationService.saveMany(
            this.stateBulkDelete.amalgamations as any,
          );
          this.stateBulkDelete.criterion = {
            fBit: random.item(this.stateBulkDelete.amalgamations).fBit,
          };
        },
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
    ];
  }
}
