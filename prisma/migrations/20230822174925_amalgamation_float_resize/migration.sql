/*
  Warnings:

  - You are about to alter the column `fFloat` on the `Amalgamation` table. The data in that column could be lost. The data in that column will be cast from `Float(53)` to `Float(24)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fFloat] FLOAT(24) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
