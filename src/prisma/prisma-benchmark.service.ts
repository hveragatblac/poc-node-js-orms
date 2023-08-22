import { Injectable } from '@nestjs/common';
import { AmalgamationService } from './services/amalgamation.service';
import { Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Benchmarkable } from '../../tools/benchmark/types/benchmarkable.type';

const random = {
  decimal: (precision: number, scale: number): string => {
    const integerPart = faker.string.numeric({
      length: {
        min: 1,
        max: precision - scale,
      },
      allowLeadingZeros: false,
    });
    const decimalPart = faker.string.numeric({
      length: {
        min: 1,
        max: scale,
      },
      allowLeadingZeros: false,
    });
    return `${integerPart}.${decimalPart}`;
  },
  buffer: (length: number) => {
    return Buffer.from(
      faker.helpers.multiple(() => faker.number.int(0xff), {
        count: length,
      }),
    );
  },
  xml: () => {
    // TODO: Implement
    return '';
  },
};

const generateAmalgamation = (): Prisma.AmalgamationCreateInput => {
  return {
    name: faker.string.alphanumeric({
      casing: 'mixed',
      length: { min: 0, max: 255 },
    }),
    fBigint: faker.number.bigInt(),
    fBit: faker.number.int({ min: 0, max: 1 }),
    fDecimal: random.decimal(30, 10),
    fInt: faker.number.int({
      min: -1 * 2 ** 31,
      max: 2 ** 31 - 1,
    }),
    fMoney: faker.number.float({
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      min: -922_337_203_685_477.5808,
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      max: 922_337_203_685_477.5807,
      precision: 0.0001,
    }),
    fSmallint: faker.number.int({
      min: -1 * 2 ** 15,
      max: 2 ** 15 - 1,
    }),
    fSmallmoney: faker.number.float({
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      min: -214_748.3648,
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      max: 214_748.3647,
      precision: 0.0001,
    }),
    fTinyint: faker.number.int({
      min: 0,
      max: 2 ** 8 - 1,
    }),
    fFloat: faker.number.float({
      min: -3.4e30,
      max: 3.4e30,
      // min: -3.4e38,
      // max: 3.4e38,
      // precision: 0.0000000001,
    }),
    fReal: faker.number.float({
      min: -3.4e30,
      max: 3.4e30,
      // min: -3.4e38,
      // max: 3.4e38,
      // precision: 0.0000000001,
    }),
    fDate: faker.date.anytime(),
    fDatetime2: faker.date.anytime(),
    fDatetime: faker.date.anytime(),
    fDatetimeoffset: faker.date.anytime(),
    fSmalldatetime: faker.date.anytime(),
    fTime: faker.date.anytime(),
    fChar: faker.string.sample({ min: 0, max: 255 }),
    fVarchar: faker.string.sample({ min: 0, max: 255 }),
    fText: faker.string.sample({ min: 0, max: 255 }),
    fNChar: faker.string.sample({ min: 0, max: 255 }),
    fNVarchar: faker.string.sample({ min: 0, max: 255 }),
    fNText: faker.string.sample({ min: 0, max: 255 }),
    fBinary: random.buffer(8),
    fImage: random.buffer(8),
    fVarbinary: random.buffer(8),
    fUniqueidentifier: faker.string.uuid(),
    fXml: random.xml(),
  };
};

@Injectable()
export class PrismaBenchmarkService implements Benchmarkable {
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run() {
    return [
      {
        name: 'Single insert',
        task: async (dto) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateArguments: generateAmalgamation,
      },
      {
        name: 'Bulk insert',
        task: async (dtos) => {
          await this.amalgamationService.saveMany(dtos);
        },
        generateArguments: () =>
          Array.from({ length: 2000 }).map(generateAmalgamation),
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
          const dto = generateAmalgamation();
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
            dtos[i] = generateAmalgamation();
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
