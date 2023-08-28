import { Injectable } from '@nestjs/common';
import { Amalgamation } from '../models/amalgamation.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AmalgamationService {
  constructor(
    @InjectModel(Amalgamation, 'adventureworks')
    private amalgamationModel: typeof Amalgamation,
  ) {}

  async saveOne(dto: any) {
    return this.amalgamationModel.create(dto);
  }

  async saveMany(dtos: any[]) {
    return this.amalgamationModel.bulkCreate(dtos);
  }

  async findFirst(criterion: any) {
    return this.amalgamationModel.findOne({ where: criterion });
  }

  // TODO: Should enforce usage of unique criterion like Prisma
  async findUnique(criterion: any) {
    return this.amalgamationModel.findOne({ where: criterion });
  }

  async find(criterion: any) {
    return this.amalgamationModel.findAll({ where: criterion });
  }

  // TODO: Should enforce usage of unique criterion like Prisma
  async updateFirst(dto: any, criterion: any) {
    return this.amalgamationModel.update(dto, { where: criterion });
  }

  async updateMany(dto: any, criterion: any) {
    return this.amalgamationModel.update(dto, { where: criterion });
  }

  async deleteFirst(criterion: any) {
    return this.amalgamationModel.destroy({ where: criterion, limit: 1 });
  }

  async deleteMany(criterion: any) {
    return this.amalgamationModel.destroy({ where: criterion });
  }
}
