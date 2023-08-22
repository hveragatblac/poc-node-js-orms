export interface Routine {
  name: string;
  task: (args: unknown) => void | Promise<void>;
  generateArguments: () => unknown;
}
