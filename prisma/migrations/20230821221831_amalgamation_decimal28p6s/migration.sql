/*
  Warnings:

  - You are about to alter the column `fDecimal` on the `Amalgamation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(30,10)` to `Decimal(28,6)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fDecimal] DECIMAL(28,6) NOT NULL;
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fBinary] BINARY NOT NULL;
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fVarbinary] VARBINARY NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
