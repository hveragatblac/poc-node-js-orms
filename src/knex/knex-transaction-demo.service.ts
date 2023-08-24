import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AmalgamationService } from './services/amalgamation.service';

@Injectable()
export class KnexTransactionDemoService implements Demo {
  private readonly logger = new Logger(KnexTransactionDemoService.name);

  constructor(
    @InjectKnex()
    private readonly knex: Knex,
    private readonly amalgamationService: AmalgamationService,
  ) {}

  async run(): Promise<void> {
    // const dto = generateAmagamationKnex();
    // const amalgamation = await this.amalgamationService.saveOne(dto);
    // this.logger.log(`Inserted ${inspect(amalgamation)}`);
    // const names = new Set();
    // const dtos = faker.helpers.uniqueArray(() => {
    //   let dto;
    //   do {
    //     dto = generateAmagamationKnex();
    //   } while (names.has(dto.name));
    //   names.add(dto.name);
    //   return dto;
    // }, 2000);
    // const amalgamations = await this.amalgamationService.saveMany(dtos);
    // this.logger.log(
    //   `Inserted ${amalgamations.length} amalgamations, first 4 are ${inspect(
    //     amalgamations.slice(0, 4),
    //   )}`,
    // );
    // const amalgamationFirst = await this.amalgamationService.findFirst({
    //   fBit: 0,
    // });
    // this.logger.log(`FindFirst got ${inspect(amalgamationFirst)}`);
    //
    // const amalgamationUnique = await this.amalgamationService.findUnique({
    //   fBit: 1,
    // });
    // this.logger.log(`FindUnique got ${inspect(amalgamationUnique)}`);
    //
    // const amalgamations = await this.amalgamationService.find({});
    // this.logger.log(
    //   `Find got ${amalgamations.length} amalgamations, first 2 are ${inspect(
    //     amalgamations.slice(0, 2),
    //   )}`,
    // );
    // const amalgamation = await this.amalgamationService.updateFirst(
    //   { fXml: '<tag>poc</tag>' },
    //   { fBit: 0 },
    // );
    // this.logger.log(`UpdateFirst got ${inspect(amalgamation)}`);
    // const amalgamations = await this.amalgamationService.updateMany(
    //   { fXml: '<tag>fBit is true</tag>' },
    //   { fBit: 1 },
    // );
    // this.logger.log(
    //   `UpdateMany got ${
    //     amalgamations.length
    //   } amalgamations, first 2 are${inspect(amalgamations.slice(0, 2))}`,
    // );
    // const removedAmalgamation = await this.amalgamationService.deleteFirst({
    //   fTinyint: 151,
    // });
    // this.logger.log(`DeleteFirst got ${inspect(removedAmalgamation)}`);
    //
    // const removedAmalgamations = await this.amalgamationService.deleteMany({
    //   fBit: 1,
    // });
    // this.logger.log(
    //   `DeleteMany got ${
    //     removedAmalgamations.length
    //   } amalgamations, first 2 ${removedAmalgamations.slice(0, 2)}`,
    // );
  }
}
