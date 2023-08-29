import { writeFile } from 'node:fs/promises';
import { Distribution } from './distribution.class';

(async () => {
  const samples = [
    5244.409800000489, 5270.196500003338, 5313.341099999845, 5351.2353999987245,
    5361.910100005567, 5409.091800004244, 5411.684500001371, 5411.774900004268,
    5417.872999995947, 5436.9777000024915, 5448.752800002694, 5457.825900003314,
    5468.224899999797, 5517.179399996996, 5521.024400003254, 5524.183899998665,
    5549.390000000596, 5550.220299996436, 5552.938400000334, 5565.648900002241,
    5566.185800001025, 5576.040199995041, 5577.977400004864, 5579.704199999571,
    5608.3347999975085, 5617.369099996984, 5670.907800003886, 5718.941799998283,
    5736.153700001538, 5754.916900001466, 5950.62160000205, 6126.123700000346,
    6326.123700000346,
  ];
  await writeFile(
    `test-distribution-${Date.now()}.json`,
    JSON.stringify(
      new Distribution({ samples, name: 'test' }).toJson([99, 99.9]),
    ),
    {
      encoding: 'utf-8',
    },
  );
})();
