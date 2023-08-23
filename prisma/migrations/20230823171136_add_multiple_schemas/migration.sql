BEGIN TRY

BEGIN TRAN;

-- CreateSchema
EXEC sp_executesql N'CREATE SCHEMA [base];';;

-- CreateSchema
EXEC sp_executesql N'CREATE SCHEMA [transactional];';;

-- CreateTable
CREATE TABLE [base].[user] (
    [id] INT NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [transactional].[Order] (
    [id] INT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [transactional].[Order] ADD CONSTRAINT [Order_id_fkey] FOREIGN KEY ([id]) REFERENCES [base].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
