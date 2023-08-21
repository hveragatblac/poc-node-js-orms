/*
  Warnings:

  - You are about to alter the column `fDecimal` on the `Amalgamation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(28,6)` to `Decimal(30,10)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fDecimal] DECIMAL(30,10) NOT NULL;
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fBinary] BINARY(8) NOT NULL;
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fVarbinary] VARBINARY(8) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
