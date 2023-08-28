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
  constructor(private readonly amalgamationService: AmalgamationService) {}

  async run(): Promise<Routine[]> {
    return [
      {
        name: 'Single insert',
        task: async (dto: any) => {
          await this.amalgamationService.saveOne(dto);
        },
        generateTaskArguments: () =>
          random.amalgamation({ updater: typeormAdjustAmalgamation }),
        afterTask: async () => {
          await this.amalgamationService.deleteMany({});
        },
      },
    ];
  }
}
