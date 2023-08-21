/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Amalgamation` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fBinary] BINARY NOT NULL;
ALTER TABLE [SalesLT].[Amalgamation] ALTER COLUMN [fVarbinary] VARBINARY NOT NULL;

-- CreateIndex
ALTER TABLE [SalesLT].[Amalgamation] ADD CONSTRAINT [AK_Amalgamation_name] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
