import { Seeder } from './interface/seeder.interface';
import { Type } from '@nestjs/common';
import { AmalgamationSeeder } from './seeders/amalgamation.seeder';

export const seeders: Type<Seeder>[] = [AmalgamationSeeder];
