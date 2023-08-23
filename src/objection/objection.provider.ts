import { ObjectionService } from './objection-service.class';
import { ConfigService } from '@nestjs/config';
import Knex from 'knex';

// TODO: This is wrong, start with Knex then come back to Objection
export const objectionProvider = {
  provide: ObjectionService,
  useFactory: (configService: ConfigService) => {
    const config = configService.get('db-objection');
    const knex = Knex(config);
    ObjectionService.knex(knex);
    return null;
  },
};
