import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Amalgamation', {
  schema: 'SalesLT',
})
export class Amalgamation {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'fBigint', type: 'bigint' })
  fBigint: string;

  @Column({ name: 'fBit', type: 'bit' })
  fBit: number;

  @Column({ name: 'fDecimal', type: 'decimal', precision: 30, scale: 10 })
  fDecimal: string;

  @Column({ name: 'fInt', type: 'int' })
  fInt: number;

  @Column({ name: 'fMoney', type: 'money' })
  fMoney: number;

  @Column({ name: 'fSmallint', type: 'smallint' })
  fSmallint: number;

  @Column({ name: 'fSmallmoney', type: 'smallmoney' })
  fSmallmoney: number;

  @Column({ name: 'fTinyint', type: 'tinyint' })
  fTinyint: number;

  @Column({ name: 'fFloat', type: 'float' })
  fFloat: number;

  @Column({ name: 'fReal', type: 'real' })
  fReal: number;

  @Column({ name: 'fDate', type: 'date' })
  fDate: Date;

  @Column({ name: 'fDatetime2', type: 'datetime2' })
  fDatetime2: Date;

  @Column({ name: 'fDatetime', type: 'datetime' })
  fDatetime: Date;

  @Column({ name: 'fDatetimeoffset', type: 'datetimeoffset' })
  fDatetimeoffset: Date;

  @Column({ name: 'fSmalldatetime', type: 'smalldatetime' })
  fSmalldatetime: Date;

  @Column({ name: 'fTime', type: 'time' })
  fTime: Date;

  @Column({ name: 'fChar', type: 'char', length: 255 })
  fChar: string;

  @Column({ name: 'fVarchar', type: 'varchar', length: 255 })
  fVarchar: string;

  @Column({ name: 'fText', type: 'text' })
  fText: string;

  @Column({ name: 'fNChar', type: 'nchar', length: 255 })
  fNChar: string;

  @Column({ name: 'fNVarchar', type: 'nvarchar', length: 255 })
  fNVarchar: string;

  @Column({ name: 'fNText', type: 'ntext' })
  fNText: string;

  @Column({ name: 'fBinary', type: 'binary', length: 8 })
  fBinary: Buffer;

  @Column({ name: 'fImage', type: 'image' })
  fImage: Buffer;

  @Column({ name: 'fVarbinary', type: 'varbinary', length: 8 })
  fVarbinary: Buffer;

  @Column({ name: 'fUniqueidentifier', type: 'uniqueidentifier' })
  fUniqueidentifier: string;

  @Column({ name: 'fXml', type: 'xml' })
  fXml: string;
}
