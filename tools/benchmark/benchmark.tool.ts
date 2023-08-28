import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { Logger, Type } from '@nestjs/common';
import { Benchmarkable } from './types/benchmarkable.type';
import { Measurement } from './types/measurement.type';
import { writeFile } from 'node:fs/promises';
import { Distribution } from '../statistics/distribution.class';
import * as process from 'node:process';
import { TypeormBenchmarkService } from '../../src/typeorm/typeorm-benchmark.service';

type BiMap<T> = Record<string, Record<string, T>>;

const targets: Type<Benchmarkable>[] = [
  // PrismaBenchmarkService,
  // KnexBenchmarkService,
  // PrismaBenchmarkService,
  TypeormBenchmarkService,
];
const measurementsByNameByTarget: BiMap<Measurement[]> = {};
const repetitions = 10 ** 1;

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
      // TODO: Add resource utilization, such as CPU, Memory, Disk and Network
      logger.log(`Running ${routine.name}`);

      if (typeof routine.beforeTask === 'function') {
        await routine.beforeTask();
      }

      for (const measurement of measurements) {
        if (typeof routine.beforeMeasurement === 'function') {
          await routine.beforeMeasurement();
        }

        const taskArgs = [];
        if (typeof routine.generateTaskArguments === 'function') {
          const args = await routine.generateTaskArguments();
          taskArgs.push(args);
        }

        measurement.startedAt = performance.now();
        await routine.task.call(routine, ...taskArgs);
        measurement.finishedAt = performance.now();

        if (typeof routine.afterMeasurement === 'function') {
          await routine.afterMeasurement();
        }
      }

      if (typeof routine.afterTask === 'function') {
        await routine.afterTask();
      }

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
