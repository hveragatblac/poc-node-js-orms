BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [SalesLT].[Address] (
    [AddressID] INT NOT NULL IDENTITY(1,1),
    [AddressLine1] NVARCHAR(60) NOT NULL,
    [AddressLine2] NVARCHAR(60),
    [City] NVARCHAR(30) NOT NULL,
    [StateProvince] NVARCHAR(50) NOT NULL,
    [CountryRegion] NVARCHAR(50) NOT NULL,
    [PostalCode] NVARCHAR(15) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Address_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_Address_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Address_AddressID] PRIMARY KEY CLUSTERED ([AddressID]),
    CONSTRAINT [AK_Address_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[Customer] (
    [CustomerID] INT NOT NULL IDENTITY(1,1),
    [NameStyle] BIT NOT NULL CONSTRAINT [DF_Customer_NameStyle] DEFAULT 0,
    [Title] NVARCHAR(8),
    [FirstName] NVARCHAR(50) NOT NULL,
    [MiddleName] NVARCHAR(50),
    [LastName] NVARCHAR(50) NOT NULL,
    [Suffix] NVARCHAR(10),
    [CompanyName] NVARCHAR(128),
    [SalesPerson] NVARCHAR(256),
    [EmailAddress] NVARCHAR(50),
    [Phone] NVARCHAR(25),
    [PasswordHash] VARCHAR(128) NOT NULL,
    [PasswordSalt] VARCHAR(10) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Customer_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_Customer_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Customer_CustomerID] PRIMARY KEY CLUSTERED ([CustomerID]),
    CONSTRAINT [AK_Customer_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[CustomerAddress] (
    [CustomerID] INT NOT NULL,
    [AddressID] INT NOT NULL,
    [AddressType] NVARCHAR(50) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_CustomerAddress_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_CustomerAddress_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_CustomerAddress_CustomerID_AddressID] PRIMARY KEY CLUSTERED ([CustomerID],[AddressID]),
    CONSTRAINT [AK_CustomerAddress_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[Product] (
    [ProductID] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(50) NOT NULL,
    [ProductNumber] NVARCHAR(25) NOT NULL,
    [Color] NVARCHAR(15),
    [StandardCost] MONEY NOT NULL,
    [ListPrice] MONEY NOT NULL,
    [Size] NVARCHAR(5),
    [Weight] DECIMAL(8,2),
    [ProductCategoryID] INT,
    [ProductModelID] INT,
    [SellStartDate] DATETIME NOT NULL,
    [SellEndDate] DATETIME,
    [DiscontinuedDate] DATETIME,
    [ThumbNailPhoto] VARBINARY(max),
    [ThumbnailPhotoFileName] NVARCHAR(50),
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_Product_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_Product_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Product_ProductID] PRIMARY KEY CLUSTERED ([ProductID]),
    CONSTRAINT [AK_Product_Name] UNIQUE NONCLUSTERED ([Name]),
    CONSTRAINT [AK_Product_ProductNumber] UNIQUE NONCLUSTERED ([ProductNumber]),
    CONSTRAINT [AK_Product_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[ProductCategory] (
    [ProductCategoryID] INT NOT NULL IDENTITY(1,1),
    [ParentProductCategoryID] INT,
    [Name] NVARCHAR(50) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_ProductCategory_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_ProductCategory_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_ProductCategory_ProductCategoryID] PRIMARY KEY CLUSTERED ([ProductCategoryID]),
    CONSTRAINT [AK_ProductCategory_Name] UNIQUE NONCLUSTERED ([Name]),
    CONSTRAINT [AK_ProductCategory_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[ProductDescription] (
    [ProductDescriptionID] INT NOT NULL IDENTITY(1,1),
    [Description] NVARCHAR(400) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_ProductDescription_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_ProductDescription_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_ProductDescription_ProductDescriptionID] PRIMARY KEY CLUSTERED ([ProductDescriptionID]),
    CONSTRAINT [AK_ProductDescription_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[ProductModel] (
    [ProductModelID] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(50) NOT NULL,
    [CatalogDescription] XML,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_ProductModel_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_ProductModel_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_ProductModel_ProductModelID] PRIMARY KEY CLUSTERED ([ProductModelID]),
    CONSTRAINT [AK_ProductModel_Name] UNIQUE NONCLUSTERED ([Name]),
    CONSTRAINT [AK_ProductModel_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[ProductModelProductDescription] (
    [ProductModelID] INT NOT NULL,
    [ProductDescriptionID] INT NOT NULL,
    [Culture] NCHAR(6) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_ProductModelProductDescription_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_ProductModelProductDescription_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_ProductModelProductDescription_ProductModelID_ProductDescriptionID_Culture] PRIMARY KEY CLUSTERED ([ProductModelID],[ProductDescriptionID],[Culture]),
    CONSTRAINT [AK_ProductModelProductDescription_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[SalesOrderDetail] (
    [SalesOrderID] INT NOT NULL,
    [SalesOrderDetailID] INT NOT NULL IDENTITY(1,1),
    [OrderQty] SMALLINT NOT NULL,
    [ProductID] INT NOT NULL,
    [UnitPrice] MONEY NOT NULL,
    [UnitPriceDiscount] MONEY NOT NULL CONSTRAINT [DF_SalesOrderDetail_UnitPriceDiscount] DEFAULT 0.0,
    [LineTotal] DECIMAL(38,6) NOT NULL,
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_SalesOrderDetail_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_SalesOrderDetail_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_SalesOrderDetail_SalesOrderID_SalesOrderDetailID] PRIMARY KEY CLUSTERED ([SalesOrderID],[SalesOrderDetailID]),
    CONSTRAINT [AK_SalesOrderDetail_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateTable
CREATE TABLE [SalesLT].[SalesOrderHeader] (
    [SalesOrderID] INT NOT NULL IDENTITY(1,1),
    [RevisionNumber] TINYINT NOT NULL CONSTRAINT [DF_SalesOrderHeader_RevisionNumber] DEFAULT 0,
    [OrderDate] DATETIME NOT NULL CONSTRAINT [DF_SalesOrderHeader_OrderDate] DEFAULT CURRENT_TIMESTAMP,
    [DueDate] DATETIME NOT NULL,
    [ShipDate] DATETIME,
    [Status] TINYINT NOT NULL CONSTRAINT [DF_SalesOrderHeader_Status] DEFAULT 1,
    [OnlineOrderFlag] BIT NOT NULL CONSTRAINT [DF_SalesOrderHeader_OnlineOrderFlag] DEFAULT 1,
    [SalesOrderNumber] NVARCHAR(25) NOT NULL,
    [PurchaseOrderNumber] NVARCHAR(25),
    [AccountNumber] NVARCHAR(15),
    [CustomerID] INT NOT NULL,
    [ShipToAddressID] INT,
    [BillToAddressID] INT,
    [ShipMethod] NVARCHAR(50) NOT NULL,
    [CreditCardApprovalCode] VARCHAR(15),
    [SubTotal] MONEY NOT NULL CONSTRAINT [DF_SalesOrderHeader_SubTotal] DEFAULT 0.00,
    [TaxAmt] MONEY NOT NULL CONSTRAINT [DF_SalesOrderHeader_TaxAmt] DEFAULT 0.00,
    [Freight] MONEY NOT NULL CONSTRAINT [DF_SalesOrderHeader_Freight] DEFAULT 0.00,
    [TotalDue] MONEY NOT NULL,
    [Comment] NVARCHAR(max),
    [rowguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_SalesOrderHeader_rowguid] DEFAULT newid(),
    [ModifiedDate] DATETIME NOT NULL CONSTRAINT [DF_SalesOrderHeader_ModifiedDate] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_SalesOrderHeader_SalesOrderID] PRIMARY KEY CLUSTERED ([SalesOrderID]),
    CONSTRAINT [AK_SalesOrderHeader_SalesOrderNumber] UNIQUE NONCLUSTERED ([SalesOrderNumber]),
    CONSTRAINT [AK_SalesOrderHeader_rowguid] UNIQUE NONCLUSTERED ([rowguid])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Address_AddressLine1_AddressLine2_City_StateProvince_PostalCode_CountryRegion] ON [SalesLT].[Address]([AddressLine1], [AddressLine2], [City], [StateProvince], [PostalCode], [CountryRegion]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Address_StateProvince] ON [SalesLT].[Address]([StateProvince]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Customer_EmailAddress] ON [SalesLT].[Customer]([EmailAddress]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SalesOrderDetail_ProductID] ON [SalesLT].[SalesOrderDetail]([ProductID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SalesOrderHeader_CustomerID] ON [SalesLT].[SalesOrderHeader]([CustomerID]);

-- AddForeignKey
ALTER TABLE [SalesLT].[CustomerAddress] ADD CONSTRAINT [FK_CustomerAddress_Address_AddressID] FOREIGN KEY ([AddressID]) REFERENCES [SalesLT].[Address]([AddressID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[CustomerAddress] ADD CONSTRAINT [FK_CustomerAddress_Customer_CustomerID] FOREIGN KEY ([CustomerID]) REFERENCES [SalesLT].[Customer]([CustomerID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[Product] ADD CONSTRAINT [FK_Product_ProductCategory_ProductCategoryID] FOREIGN KEY ([ProductCategoryID]) REFERENCES [SalesLT].[ProductCategory]([ProductCategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[Product] ADD CONSTRAINT [FK_Product_ProductModel_ProductModelID] FOREIGN KEY ([ProductModelID]) REFERENCES [SalesLT].[ProductModel]([ProductModelID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[ProductCategory] ADD CONSTRAINT [FK_ProductCategory_ProductCategory_ParentProductCategoryID_ProductCategoryID] FOREIGN KEY ([ParentProductCategoryID]) REFERENCES [SalesLT].[ProductCategory]([ProductCategoryID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[ProductModelProductDescription] ADD CONSTRAINT [FK_ProductModelProductDescription_ProductDescription_ProductDescriptionID] FOREIGN KEY ([ProductDescriptionID]) REFERENCES [SalesLT].[ProductDescription]([ProductDescriptionID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[ProductModelProductDescription] ADD CONSTRAINT [FK_ProductModelProductDescription_ProductModel_ProductModelID] FOREIGN KEY ([ProductModelID]) REFERENCES [SalesLT].[ProductModel]([ProductModelID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[SalesOrderDetail] ADD CONSTRAINT [FK_SalesOrderDetail_Product_ProductID] FOREIGN KEY ([ProductID]) REFERENCES [SalesLT].[Product]([ProductID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[SalesOrderDetail] ADD CONSTRAINT [FK_SalesOrderDetail_SalesOrderHeader_SalesOrderID] FOREIGN KEY ([SalesOrderID]) REFERENCES [SalesLT].[SalesOrderHeader]([SalesOrderID]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[SalesOrderHeader] ADD CONSTRAINT [FK_SalesOrderHeader_Address_BillTo_AddressID] FOREIGN KEY ([BillToAddressID]) REFERENCES [SalesLT].[Address]([AddressID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[SalesOrderHeader] ADD CONSTRAINT [FK_SalesOrderHeader_Address_ShipTo_AddressID] FOREIGN KEY ([ShipToAddressID]) REFERENCES [SalesLT].[Address]([AddressID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [SalesLT].[SalesOrderHeader] ADD CONSTRAINT [FK_SalesOrderHeader_Customer_CustomerID] FOREIGN KEY ([CustomerID]) REFERENCES [SalesLT].[Customer]([CustomerID]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

