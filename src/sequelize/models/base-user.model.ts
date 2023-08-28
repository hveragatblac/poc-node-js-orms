import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { TransactionalOrder } from './transactional-order.model';

@Table({ tableName: 'User', schema: 'base', timestamps: false })
export class BaseUser extends Model {
  @Column({ type: 'Int', primaryKey: true })
  id: number;

  @HasMany(() => TransactionalOrder)
  transactionalOrders: TransactionalOrder;
}
