import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesltAmalgamation1693255817481
  implements MigrationInterface
{
  name = 'CreateSalesltAmalgamation1693255817481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "SalesLT"."Amalgamation" ("id" int NOT NULL IDENTITY(1,1), "name" varchar(255) NOT NULL, "fBigint" bigint NOT NULL, "fBit" bit NOT NULL, "fDecimal" decimal(30,10) NOT NULL, "fInt" int NOT NULL, "fMoney" money NOT NULL, "fSmallint" smallint NOT NULL, "fSmallmoney" smallmoney NOT NULL, "fTinyint" tinyint NOT NULL, "fFloat" float NOT NULL, "fReal" real NOT NULL, "fDate" date NOT NULL, "fDatetime2" datetime2 NOT NULL, "fDatetime" datetime NOT NULL, "fDatetimeoffset" datetimeoffset NOT NULL, "fSmalldatetime" smalldatetime NOT NULL, "fTime" time NOT NULL, "fChar" char(255) NOT NULL, "fVarchar" varchar(255) NOT NULL, "fText" text NOT NULL, "fNChar" nchar(255) NOT NULL, "fNVarchar" nvarchar(255) NOT NULL, "fNText" ntext NOT NULL, "fBinary" binary(8) NOT NULL, "fImage" image NOT NULL, "fVarbinary" varbinary(8) NOT NULL, "fUniqueidentifier" uniqueidentifier NOT NULL, "fXml" xml NOT NULL, CONSTRAINT "PK_1b249a17b487d59b05e68054a4f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SalesLT"."Amalgamation"`);
  }
}
