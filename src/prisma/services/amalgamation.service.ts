import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AmalgamationService {
  constructor(private readonly prisma: PrismaService) {}

  async saveOne(dto: Prisma.AmalgamationCreateInput) {
    return this.prisma.amalgamation.create({
      data: dto,
    });
  }

  async saveMany(dtos: Prisma.AmalgamationCreateManyInput) {
    return this.prisma.amalgamation.createMany({
      data: dtos,
    });
  }

  async findFirst(criterion: Prisma.AmalgamationFindFirstArgs['where']) {
    return this.prisma.amalgamation.findFirst({
      where: criterion,
    });
  }

  async findUnique(criterion: Prisma.AmalgamationFindUniqueArgs['where']) {
    return this.prisma.amalgamation.findUnique({
      where: criterion,
    });
  }

  async find(criterion: Prisma.AmalgamationFindManyArgs['where']) {
    return this.prisma.amalgamation.findMany({
      where: criterion,
    });
  }

  async updateFirst(
    dto: Prisma.AmalgamationUpdateArgs['data'],
    criterion: Prisma.AmalgamationUpdateArgs['where'],
  ) {
    return this.prisma.amalgamation.update({
      data: dto,
      where: criterion,
    });
  }

  async updateMany(
    dto: Prisma.AmalgamationUpdateManyArgs['data'],
    criterion: Prisma.AmalgamationUpdateManyArgs['where'],
  ) {
    return this.prisma.amalgamation.updateMany({
      data: dto,
      where: criterion,
    });
  }

  async deleteFirst(criterion: Prisma.AmalgamationDeleteArgs['where']) {
    return this.prisma.amalgamation.delete({
      where: criterion,
    });
  }

  async deleteMany(criterion: Prisma.AmalgamationDeleteManyArgs['where']) {
    return this.prisma.amalgamation.deleteMany({
      where: criterion,
    });
  }
}
