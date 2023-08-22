import { faker } from '@faker-js/faker';
import { writeFile } from 'node:fs/promises';
import { Distribution } from './distribution.class';

(async () => {
  const samples = faker.helpers.multiple(() => faker.number.int(1000), {
    count: 2000,
  });
  await writeFile(
    `test-distribution-${performance.now()}.json`,
    JSON.stringify(
      new Distribution({ samples, name: 'test' }).toJson([99, 99.9]),
    ),
    {
      encoding: 'utf-8',
    },
  );
})();
