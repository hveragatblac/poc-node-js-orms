import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Amalgamation', schema: 'SalesLT', timestamps: false })
export class Amalgamation extends Model {
  @Column({ type: 'int', primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: 'VarChar(255)' })
  name: string;

  @Column({ type: 'BigInt' })
  fBigint: number;

  @Column({ type: 'Bit' })
  fBit: number;

  @Column({ type: 'Decimal(30, 10)' })
  fDecimal: string;

  @Column({ type: 'Int' })
  fInt: number;

  @Column({ type: 'Money' })
  fMoney: string;

  @Column({ type: 'SmallInt' })
  fSmallint: number;

  @Column({ type: 'SmallMoney' })
  fSmallmoney: string;

  @Column({ type: 'TinyInt' })
  fTinyint: number;

  @Column({ type: 'Float(24)' })
  fFloat: string;

  @Column({ type: 'Real' })
  fReal: string;

  @Column({ type: 'Date' })
  fDate: Date;

  @Column({ type: 'DateTime2' })
  fDatetime2: Date;

  @Column({ type: 'DateTime' })
  fDatetime: Date;

  @Column({ type: 'DateTimeOffset' })
  fDatetimeoffset: Date;

  @Column({ type: 'SmallDateTime' })
  fSmalldatetime: Date;

  @Column({ type: 'Time' })
  fTime: Date;

  @Column({ type: 'Char(255)' })
  fChar: string;

  @Column({ type: 'VarChar(255)' })
  fVarchar: string;

  @Column({ type: 'Text' })
  fText: string;

  @Column({ type: 'NChar(255)' })
  fNChar: string;

  @Column({ type: 'NVarChar(255)' })
  fNVarchar: string;

  @Column({ type: 'NText' })
  fNText: string;

  @Column({ type: 'Binary(8)' })
  fBinary: Buffer;

  @Column({ type: 'Image' })
  fImage: Buffer;

  @Column({ type: 'VarBinary(8)' })
  fVarbinary: Buffer;

  @Column({ type: 'UniqueIdentifier' })
  fUniqueidentifier: string;

  @Column({ type: 'Xml' })
  fXml: string;
}
