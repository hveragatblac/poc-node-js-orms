import { Injectable, Logger } from '@nestjs/common';
import { Demo } from '../@common/types/demo.type';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Amalgamation } from './models/amalgamation.model';
import { BaseUser } from './models/base-user.model';
import { TransactionalOrder } from './models/transactional-order.model';

@Injectable()
export class SequelizeMultiDatasourceDemoService implements Demo {
  private readonly logger = new Logger(
    SequelizeMultiDatasourceDemoService.name,
  );

  constructor(
    @InjectConnection('adventureworks')
    private readonly adventureworks: Sequelize,
    @InjectModel(Amalgamation, 'adventureworks')
    private readonly amalgamation: typeof Amalgamation,
    @InjectModel(BaseUser, 'adventureworks')
    private readonly baseUser: typeof BaseUser,
    @InjectModel(TransactionalOrder, 'adventureworks')
    private readonly transactionalOrder: typeof TransactionalOrder,
    @InjectConnection('bcsriesgo')
    private readonly bcsRiesgo: Sequelize,
    @InjectModel(User, 'bcsriesgo')
    private readonly user: typeof User,
  ) {}

  async run(): Promise<void> {
    await this.doQueryDifferentDatasources();
    await this.doQueryAcrossMultipleDatabaseSchemas();
    this.logger.log(`Finished ${SequelizeMultiDatasourceDemoService.name}`);
  }

  private async doQueryDifferentDatasources() {
    const userCount = await this.user.count();
    this.logger.log(`Database BCS-RIESGO has ${userCount} users`);
    const amalgamationCount = await this.amalgamation.count();
    this.logger.log(
      `Database AdventureWorksLT2019_Sequelize has ${amalgamationCount} amalgamations`,
    );
  }

  private async doQueryAcrossMultipleDatabaseSchemas() {
    // Order belongs to transactional schema
    // User belongs to base schema
    const users = await this.baseUser.findAll({
      include: TransactionalOrder,
    });
    this.logger.log(`Got base.User`, users);
  }
}
