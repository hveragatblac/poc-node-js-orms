import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Amalgamation } from '../models/amalgamation.model';
import { InjectModel } from '@nestjs/sequelize';
import { random } from '../../@common/utils/random.util';
import { adjustAmalgamation } from '../../knex/knex-benchmark.service';
import { format } from 'date-fns';

@Injectable()
export class AmalgamationService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Amalgamation)
    private amalgamationModel: typeof Amalgamation,
  ) {}

  async create() {
    return this.amalgamationModel.create(
      random.amalgamation({
        updater: (dto) => {
          dto.fDecimal = '99999999999999999999.9999999999';
          dto.fFloat = (dto.fFloat as number).toString(10);
          dto.fReal = (dto.fReal as number).toString(10);
          dto.fDate = format(dto.fDate, 'yyyy-MM-dd');
          dto.fDatetime2 = format(dto.fDatetime2, 'yyyy-MM-dd hh:mm:ss');
          dto.fDatetime = format(dto.fDatetime, 'yyyy-MM-dd hh:mm:ss');
          dto.fDatetimeoffset = format(
            dto.fDatetimeoffset,
            'yyyy-MM-dd hh:mm:ss',
          );
          dto.fSmalldatetime = format(
            dto.fSmalldatetime,
            'yyyy-MM-dd hh:mm:ss',
          );
          dto.fTime = format(dto.fTime, 'hh:mm:ss');
        },
      }),
    );
  }
}
