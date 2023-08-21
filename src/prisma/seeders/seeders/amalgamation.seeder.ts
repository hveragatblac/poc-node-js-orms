import { Seeder } from '../interface/seeder.interface';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

const now = new Date();

const amalgamations: Prisma.AmalgamationUpsertArgs[] = [
  {
    where: {
      name: 'seed-001',
    },
    update: {},
    create: {
      name: 'seed-001',
      fBigint: BigInt('9223372036854775807'),
      fBit: 1,
      fDecimal: '99999999999999999999.9999999999',
      fInt: 2 ** 31 - 1,
      fMoney: 0, // Prisma does not accept strings out of the box for Money type
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      // fMoney: 922337203685477.5807, // Prisma does not accept strings out of the box for Money type
      fSmallint: 32767,
      fSmallmoney: 0,
      // fSmallmoney: 214748.3647,
      fTinyint: 255,
      fFloat: 0,
      // fFloat: 1.79e308,
      fReal: 0,
      // fReal: 3.4e38,
      fDate: now,
      fDatetime2: now,
      fDatetime: now,
      fDatetimeoffset: now,
      fSmalldatetime: now,
      fTime: now,
      fChar: 'áéíóú',
      fVarchar: 'áéíóú',
      fText: 'áéíóú',
      fNChar: 'áéíóú',
      fNVarchar: 'áéíóú',
      fNText: 'áéíóú',
      fBinary: Buffer.from(
        new Uint8Array([0x50, 0x4f, 0x43, 0x20, 0x4f, 0x52, 0x4d, 0x73]),
      ),
      fImage: Buffer.from(
        new Uint8Array([0x50, 0x4f, 0x43, 0x20, 0x4f, 0x52, 0x4d, 0x73]),
      ),
      fVarbinary: Buffer.from(
        new Uint8Array([0x50, 0x4f, 0x43, 0x20, 0x4f, 0x52, 0x4d, 0x73]),
      ),
      fUniqueidentifier: randomUUID(),
      fXml: '<some-tag>POC ORMs</some-tag>',
    },
  },
];

@Injectable()
export class AmalgamationSeeder implements Seeder {
  constructor(private readonly prisma: PrismaService) {}

  async drop(): Promise<void> {
    const names = amalgamations.map((u) => u.create.name);
    this.prisma.amalgamation.deleteMany({
      where: {
        name: {
          in: names,
        },
      },
    });
  }

  async seed(): Promise<void> {
    for (const amalgamation of amalgamations) {
      await this.prisma.amalgamation.upsert(amalgamation);
    }
  }
}
