import { Column, Model, Table } from 'sequelize-typescript';
import { literal } from 'sequelize';

@Table({ tableName: 'users', schema: 'dbo', timestamps: false })
export class User extends Model {
  @Column({
    type: 'UniqueIdentifier',
    primaryKey: true,
    defaultValue: literal('newsequentialid()'),
  })
  id: number;

  @Column({ type: 'NVarChar(255)', unique: true })
  email: string;
}
