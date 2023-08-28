import { faker } from '@faker-js/faker';

export const random = {
  item: (items: any[]) => {
    return items[Math.floor(Math.random() * items.length)];
  },
  decimal: (
    precision: number,
    scale: number,
    options?: { min: bigint; max: bigint },
  ): string => {
    const maxIntegral = 10n ** BigInt(precision - scale) - 1n;
    const integralPart = faker.number.bigInt({
      min: options?.min ?? -1n * maxIntegral,
      max: options?.max ?? maxIntegral,
    });

    const integralMatchesBounds =
      integralPart === options?.max || integralPart === options?.min;
    const maxFractional = integralMatchesBounds
      ? 0n
      : 10n ** BigInt(scale) - 1n;
    const fractionalPart = faker.number.bigInt({
      min: 0n,
      max: maxFractional,
    });

    return `${integralPart.toString(10)}.${fractionalPart.toString(10)}`;
    // const integerPart = faker.string.numeric({
    //   length: {
    //     min: 1,
    //     max: precision - scale,
    //   },
    //   allowLeadingZeros: false,
    // });
    // const decimalPart = faker.string.numeric({
    //   length: {
    //     min: 1,
    //     max: scale,
    //   },
    //   allowLeadingZeros: false,
    // });
    // return `${integerPart}.${decimalPart}`;
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
  amalgamation: (args?: { updater?: (o: any) => void }) => {
    const o = {
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
    if (args?.updater) {
      args.updater(o);
    }
    return o;
  },
  amalgamations: (args: { count: number; updater?: (o: any) => void }) => {
    return faker.helpers.multiple(
      () => random.amalgamation({ updater: args.updater }),
      { count: args.count },
    );
  },
};
