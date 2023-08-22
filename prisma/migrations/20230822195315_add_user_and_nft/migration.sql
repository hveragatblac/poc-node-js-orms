BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [SalesLT].[User] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_User_id] DEFAULT newid(),
    [name] NVARCHAR(255) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AK_User_name] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [SalesLT].[Nft] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Nft_id] DEFAULT newid(),
    [url] NVARCHAR(510) NOT NULL,
    [userId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [Nft_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [AK_Nft_url] UNIQUE NONCLUSTERED ([url])
);

-- AddForeignKey
ALTER TABLE [SalesLT].[Nft] ADD CONSTRAINT [Nft_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [SalesLT].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
