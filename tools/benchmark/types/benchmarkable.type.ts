import { Routine } from './routine.type';

export interface Benchmarkable {
  run: () => Promise<Routine[]> | Routine[];
}
