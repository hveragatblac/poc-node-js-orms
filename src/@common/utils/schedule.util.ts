export const waitFor = async (args: { milliseconds: number }) => {
  await new Promise((resolve) => setTimeout(resolve, args.milliseconds));
};
