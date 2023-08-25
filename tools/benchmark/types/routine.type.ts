export interface Routine {
  name: string;
  task: (args: unknown) => void | Promise<void>;
  generateTaskArguments?: () => unknown | Promise<unknown>;
  afterTask?: () => void | Promise<void>;
  beforeTask?: () => void | Promise<void>;
}
