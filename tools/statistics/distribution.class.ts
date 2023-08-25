function sum(samples: number[]): number {
  return samples.reduce((acc, sample) => {
    acc += sample;
    return acc;
  }, 0);
}

function subtractOver(samples: number[], value: number): number[] {
  return samples.map((sample) => sample - value);
}

function powerOver(samples: number[], value: number): number[] {
  return samples.map((sample) => sample ** value);
}

export class Distribution {
  private readonly differences: number[];
  private readonly total: number;

  readonly name: string;
  readonly mean: number;
  readonly variance: number;
  readonly standardDeviation: number;
  readonly skewness: number;
  readonly kurtosis: number;
  readonly samples: number[];
  readonly ascendingSamples: number[];
  readonly descendingSamples: number[];

  constructor(args: { samples: number[]; name: string }) {
    const { samples, name } = args;
    this.total = sum(samples);

    // TODO: Revisar https://www.calculatorsoup.com/calculators/statistics/descriptivestatistics.php
    //  this are descriptive stats for a population but I think I should use the sample method
    //  to reduce bias, (ALSO VALIDATE kurtosis and skewness of RiskMetrics)
    this.name = name;
    this.samples = samples;
    this.mean = this.total / samples.length;
    this.differences = subtractOver(samples, this.mean);
    this.variance = sum(powerOver(this.differences, 2)) / samples.length;
    this.standardDeviation = Math.sqrt(this.variance);
    this.skewness = sum(powerOver(this.differences, 3)) / (samples.length * (this.standardDeviation ** 3));
    this.kurtosis = sum(powerOver(this.differences, 4)) / (samples.length * (this.standardDeviation ** 4));

    this.ascendingSamples = [...samples].sort((f, s) => f - s);
    this.descendingSamples = [...samples].sort((f, s) => s - f);
  }

  getPercentile(kth: number) {
    if (kth >= 100 || kth < 0) {
      throw new Error(`Out of range rank`);
    }
    const percent = kth / 100;
    const size = this.samples.length;
    const rank = Math.floor(size * percent);
    return {
      position: rank,
      value: this.ascendingSamples[rank],
    };
  }

  toJson(percentiles: number[]) {
    const json: Record<string, unknown> = {
      name: this.name,
      mean: this.mean,
      variance: this.variance,
      skewness: this.skewness,
      kurtosis: this.kurtosis,
      standardDeviation: this.standardDeviation,
    };
    percentiles.forEach((kth) => {
      json[`percentile-${kth.toFixed(2)}`] = this.getPercentile(kth);
    });
    json['samples'] = this.samples;
    return json;
  }
}
