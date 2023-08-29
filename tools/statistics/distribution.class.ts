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

function medianOf(
  samples: number[],
  options: { isSorted: boolean } = { isSorted: false },
) {
  const sortedSamples = options.isSorted
    ? samples
    : [...samples].sort((f, s) => f - s);
  const midpoints = midpointsOf(sortedSamples.length);
  if (midpoints.length > 1) {
    const lowerSample = sortedSamples[midpoints[0]];
    const upperSample = sortedSamples[midpoints[1]];
    return (lowerSample + upperSample) / 2;
  } else {
    return sortedSamples[midpoints[0]];
  }
}

function midpointsOf(length: number) {
  const midpoint = Math.floor(length / 2);
  if (length % 2 === 0) {
    return [midpoint - 1, midpoint];
  } else {
    return [midpoint];
  }
}

function quartilesOf(
  samples: number[],
  options: { isSorted: boolean } = { isSorted: false },
) {
  const sortedSamples = options.isSorted
    ? samples
    : [...samples].sort((f, s) => f - s);

  const q2Midpoints = midpointsOf(sortedSamples.length);
  const q2 = medianOf(sortedSamples, { isSorted: true });

  const q1Samples = sortedSamples.slice(0, q2Midpoints[0]);
  const q1 = medianOf(q1Samples, { isSorted: true });

  const q3Samples = sortedSamples.slice(q2Midpoints[1] + 1);
  const q3 = medianOf(q3Samples, { isSorted: true });

  return [q1, q2, q3];
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

  readonly accumulated: number;
  readonly minimum: number;
  readonly maximum: number;
  readonly range: number;
  readonly median: number;
  readonly quartiles: number[];
  readonly interquartileRange: number;
  readonly outliers: {
    upperFence: {
      value: number;
      found: number[];
    };
    lowerFence: {
      value: number;
      found: number[];
    };
  };

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
    this.skewness =
      sum(powerOver(this.differences, 3)) /
      (samples.length * this.standardDeviation ** 3);
    this.kurtosis =
      sum(powerOver(this.differences, 4)) /
      (samples.length * this.standardDeviation ** 4);

    this.ascendingSamples = [...samples].sort((f, s) => f - s);
    this.descendingSamples = [...samples].sort((f, s) => s - f);

    this.accumulated = sum(samples);
    this.minimum = this.ascendingSamples[0];
    this.maximum = this.descendingSamples[0];
    this.range = this.maximum - this.minimum;
    this.median = medianOf(this.ascendingSamples, { isSorted: true });
    this.quartiles = quartilesOf(this.ascendingSamples, { isSorted: true });
    this.interquartileRange = this.quartiles[2] - this.quartiles[0];

    const upperFence = this.quartiles[2] + 1.5 * this.interquartileRange;
    const lowerFence = this.quartiles[0] - 1.5 * this.interquartileRange;
    this.outliers = {
      lowerFence: {
        value: lowerFence,
        found: this.samples.filter((sample) => sample < lowerFence),
      },
      upperFence: {
        value: upperFence,
        found: this.samples.filter((sample) => sample > upperFence),
      },
    };
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
      accumulated: this.accumulated,
      minimum: this.minimum,
      maximum: this.maximum,
      range: this.range,
      median: this.median,
      quartiles: this.quartiles,
      interquartileRange: this.interquartileRange,
      outliers: this.outliers,
    };
    percentiles.forEach((kth) => {
      json[`percentile-${kth.toFixed(2)}`] = this.getPercentile(kth);
    });
    json['samples'] = this.samples;
    return json;
  }
}
