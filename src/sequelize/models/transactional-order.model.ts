import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { BaseUser } from './base-user.model';

@Table({ tableName: 'Order', schema: 'transactional', timestamps: false })
export class TransactionalOrder extends Model {
  @Column({ type: 'Int', primaryKey: true })
  id: number;

  @ForeignKey(() => BaseUser)
  userId: number;

  @BelongsTo(() => BaseUser)
  baseUser: BaseUser;
}
