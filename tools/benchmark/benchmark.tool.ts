import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { Logger, Type } from '@nestjs/common';
import { Benchmarkable } from './types/benchmarkable.type';
import { Measurement } from './types/measurement.type';
import { writeFile } from 'node:fs/promises';
import { Distribution } from '../statistics/distribution.class';
import * as process from 'node:process';
import { TypeormBenchmarkService } from '../../src/typeorm/typeorm-benchmark.service';
import { KnexBenchmarkService } from '../../src/knex/knex-benchmark.service';
import { SequelizeBenchmarkService } from '../../src/sequelize/sequelize-benchmark.service';
import { PrismaBenchmarkService } from '../../src/prisma/prisma-benchmark.service';
import { Routine } from './types/routine.type';

type BiMap<T> = Record<string, Record<string, T>>;

const targets: Type<Benchmarkable>[] = [
  PrismaBenchmarkService,
  // KnexBenchmarkService,
  // SequelizeBenchmarkService,
  // TypeormBenchmarkService,
];
const measurementsByNameByTarget: BiMap<Measurement[]> = {};
const repetitions = 2 ** 7;
const warmupRepetitions = 2 ** 2;

async function executeRoutine(
  routine: Routine,
  times: number,
  options?: {
    onBeforeCall: (i: number) => void;
    onAfterCall: (i: number) => void;
  },
): Promise<void> {
  if (typeof routine.beforeTask === 'function') {
    await routine.beforeTask();
  }

  for (let i = 0; i < times; i++) {
    if (typeof routine.beforeMeasurement === 'function') {
      await routine.beforeMeasurement();
    }

    const taskArgs = [];
    if (typeof routine.generateTaskArguments === 'function') {
      const args = await routine.generateTaskArguments();
      taskArgs.push(args);
    }

    options?.onBeforeCall(i);
    await routine.task.call(routine, ...taskArgs);
    options?.onAfterCall(i);

    if (typeof routine.afterMeasurement === 'function') {
      await routine.afterMeasurement();
    }
  }

  if (typeof routine.afterTask === 'function') {
    await routine.afterTask();
  }
}

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('Benchmark');

  for (const target of targets) {
    logger.log(`Resolving ${target.name}`);
    const instance = app.get(target);

    const measurementsByName = {} as Record<string, Measurement[]>;
    measurementsByNameByTarget[target.name] = measurementsByName;

    logger.log(`Resolving routines`);
    const routines = await instance.run();

    for (const routine of routines) {
      const measurements: Measurement[] = Array.from({
        length: repetitions,
      }).map(() => ({
        startedAt: 0,
        finishedAt: 0,
      }));

      // TODO: Add warm up
      logger.log(`Warming up ${routine.name}`);
      await executeRoutine(routine, warmupRepetitions);

      // TODO: Add resource utilization, such as CPU, Memory, Disk and Network
      logger.log(`Running ${routine.name}`);
      await executeRoutine(routine, measurements.length, {
        onBeforeCall: (i) => {
          measurements[i].startedAt = performance.now();
        },
        onAfterCall: (i) => {
          measurements[i].finishedAt = performance.now();
        },
      });

      measurementsByName[routine.name] = measurements;
    }
  }

  const results: unknown[] = [];
  for (const [target, measurementsByName] of Object.entries(
    measurementsByNameByTarget,
  )) {
    for (const [routine, measurements] of Object.entries(measurementsByName)) {
      const elapsedTimes = measurements.map(
        (measurement) => measurement.finishedAt - measurement.startedAt,
      );
      const distribution = new Distribution({
        name: `${target}::${routine}`,
        samples: elapsedTimes,
      });
      results.push(distribution.toJson([99, 99.9]));
    }
  }

  await writeFile(
    `benchmark-results/measurements-${Date.now()}.json`,
    JSON.stringify(results),
    {
      encoding: 'utf-8',
    },
  );

  process.exit(0);
})();
