BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [SalesLT].[Amalgamation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [fBigint] BIGINT NOT NULL,
    [fBit] BIT NOT NULL,
    [fDecimal] DECIMAL(30,10) NOT NULL,
    [fInt] INT NOT NULL,
    [fMoney] MONEY NOT NULL,
    [fSmallint] SMALLINT NOT NULL,
    [fSmallmoney] SMALLMONEY NOT NULL,
    [fTinyint] TINYINT NOT NULL,
    [fFloat] FLOAT NOT NULL,
    [fReal] REAL NOT NULL,
    [fDate] DATE NOT NULL,
    [fDatetime2] DATETIME2 NOT NULL,
    [fDatetime] DATETIME NOT NULL,
    [fDatetimeoffset] DATETIMEOFFSET NOT NULL,
    [fSmalldatetime] SMALLDATETIME NOT NULL,
    [fTime] TIME NOT NULL,
    [fChar] CHAR(255) NOT NULL,
    [fVarchar] VARCHAR(255) NOT NULL,
    [fText] TEXT NOT NULL,
    [fNChar] NCHAR(255) NOT NULL,
    [fNVarchar] NVARCHAR(255) NOT NULL,
    [fNText] NTEXT NOT NULL,
    [fBinary] BINARY NOT NULL,
    [fImage] IMAGE NOT NULL,
    [fVarbinary] VARBINARY NOT NULL,
    [fUniqueidentifier] UNIQUEIDENTIFIER NOT NULL,
    [fXml] XML NOT NULL,
    [createdAt] DATETIME NOT NULL CONSTRAINT [Amalgamation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updateAt] DATETIME NOT NULL CONSTRAINT [Amalgamation_updateAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Amalgamation_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
