import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

export function sequelizeAdjustAmalgamation(amalgamation) {
  amalgamation.fDate = format(amalgamation.fDate, 'yyyy-MM-dd');
  amalgamation.fDatetime = format(
    amalgamation.fDatetime,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fDatetime2 = format(
    amalgamation.fDatetime2,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fDatetimeoffset = format(
    amalgamation.fDatetimeoffset,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fSmalldatetime = format(
    amalgamation.fSmalldatetime,
    'yyyy-MM-dd hh:mm:ss',
  );
  amalgamation.fTime = format(amalgamation.fTime, 'hh:mm:ss');
}

@Injectable()
export class SequelizeBenchmarkService {}
