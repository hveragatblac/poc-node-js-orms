BEGIN TRY

BEGIN TRAN;

-- TRY CreateSchema
IF (SCHEMA_ID(N'dbo') IS NULL)
BEGIN
  EXEC('CREATE SCHEMA [dbo]')
END

-- CreateTable
CREATE TABLE [dbo].[AccessControl::USR_Permission] (
    [id] VARCHAR(255) NOT NULL,
    [description] TEXT NOT NULL CONSTRAINT [DF_28da1e6cfa7d8e5d3dfbcd5fbb3] DEFAULT '',
    CONSTRAINT [PK_89de6d675282125a4d5521f69b2] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AccessControl::USR_Profile] (
    [id] VARCHAR(3) NOT NULL,
    [description] TEXT NOT NULL CONSTRAINT [DF_d731876c66074b6b7d05ea61b4b] DEFAULT '',
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_5c4e5d554e84cb84f8fd7b6b05b] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_7f5f9370af3afafc8c9a16e2153] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[AccessControl::USR_User] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_ace7c472acba9ab08adf9632127] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_ace7c472acba9ab08adf9632127] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_33500393791862d9986e55a56a2] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [UQ_ba775ff6d9bf6ed07e0cbd9ac88] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Aggregation::AGG_Aggregation] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_55938c14b5cf4ccf62a32caaaff] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [user_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_55938c14b5cf4ccf62a32caaaff] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Aggregation::AGG_AggregationAttribute] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_fa67415be1ac069415ca21db64c] DEFAULT newsequentialid(),
    [aggregationId] UNIQUEIDENTIFIER,
    [position] INT NOT NULL,
    [attributeId] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_fa67415be1ac069415ca21db64c] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Aggregation::AGG_Attribute] (
    [name] VARCHAR(255) NOT NULL,
    [description] TEXT,
    [code] VARCHAR(3),
    [user_id] UNIQUEIDENTIFIER,
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_bfbcb743970f3f4eddcf5263a50] DEFAULT newsequentialid(),
    CONSTRAINT [PK_bfbcb743970f3f4eddcf5263a50] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_658f65b44c53f71ff3906630d93] UNIQUE NONCLUSTERED ([name],[user_id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_ExternalAttributeMapping] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_c1126ed0fa81e6a05bc46effbdd] DEFAULT newsequentialid(),
    [source_attribute] VARCHAR(255) NOT NULL,
    [target_attribute] VARCHAR(255) NOT NULL,
    [default_value] VARCHAR(255),
    [is_active] TINYINT NOT NULL CONSTRAINT [DF_d3effbd61fa2218b79863bfaea4] DEFAULT 1,
    [external_entity_container_id] UNIQUEIDENTIFIER,
    [mappers] NTEXT CONSTRAINT [DF_6b0127834130fd9cb7622fdee1c] DEFAULT '[]',
    [is_required] TINYINT NOT NULL CONSTRAINT [DF_b812ac70e0576c29d3a26c4072e] DEFAULT 0,
    CONSTRAINT [INP_ExternalAttributeMapping_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_ExternalContainer] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_72d7f38ef3e475cb58367203bb6] DEFAULT newsequentialid(),
    [fully_qualified_name] VARCHAR(255) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [datasource] NVARCHAR(255) NOT NULL,
    [container_type] NVARCHAR(255) NOT NULL,
    [metadata] NTEXT NOT NULL CONSTRAINT [DF_425e6f01afe113e4b0558218916] DEFAULT '{}',
    [is_active] TINYINT NOT NULL CONSTRAINT [DF_58f4243f1fd6f99b350caeb149f] DEFAULT 1,
    CONSTRAINT [INP_ExternalContainer_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_ExternalEntityContainerMapping] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_9d9ca0dc30a930fda6274584d5a] DEFAULT newsequentialid(),
    [source_identifier_attribute] VARCHAR(255) NOT NULL,
    [is_active] TINYINT NOT NULL CONSTRAINT [DF_49535e20ef12a74404fdc0d1fe1] DEFAULT 1,
    [metadata] NTEXT NOT NULL CONSTRAINT [DF_39b3e735397ce702b299ae7dcad] DEFAULT '{}',
    [external_container_id] UNIQUEIDENTIFIER,
    [external_entity_mapping_id] UNIQUEIDENTIFIER NOT NULL,
    [is_identity_provider] TINYINT NOT NULL CONSTRAINT [DF_636cc7dbf8f0e60e8fd14ef9375] DEFAULT 0,
    CONSTRAINT [IO::INP_ExternalEntityContainerMapping_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_ExternalEntityMapping] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_c23c11971595130604cbbfaf62f] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [identifier_attribute] VARCHAR(255) NOT NULL,
    CONSTRAINT [IO::INP_ExternalEntityMapping_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Files] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_88c3e45b1f213c753cfc18506c1] DEFAULT newsequentialid(),
    [file_name] NVARCHAR(255) NOT NULL,
    [user_id] UNIQUEIDENTIFIER,
    [file_type] VARCHAR(15) NOT NULL,
    [status] NVARCHAR(255) NOT NULL,
    [data] VARBINARY(max) NOT NULL,
    CONSTRAINT [PK_88c3e45b1f213c753cfc18506c1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Input] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_9bde116a89e05b1e8ee1e0fdf32] DEFAULT newsequentialid(),
    [type_id] VARCHAR(6),
    [provider_id] VARCHAR(3),
    CONSTRAINT [PK_9bde116a89e05b1e8ee1e0fdf32] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Process] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_82de7fa97edb7d6ac988400d1ee] DEFAULT newsequentialid(),
    [is_available] TINYINT NOT NULL CONSTRAINT [DF_9c38b810a8edae6e26b8a58315b] DEFAULT 0,
    [business_date] DATE NOT NULL,
    [startAt] DATETIME2 NOT NULL CONSTRAINT [DF_991f7377a5d21c35ca32b4f683d] DEFAULT CURRENT_TIMESTAMP,
    [endAt] DATETIME2,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_f458008c76f3a3951eefab3a79a] DEFAULT CURRENT_TIMESTAMP,
    [message] NTEXT NOT NULL,
    [userId] UNIQUEIDENTIFIER,
    [inputId] UNIQUEIDENTIFIER,
    [statusId] VARCHAR(3),
    CONSTRAINT [PK_82de7fa97edb7d6ac988400d1ee] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Process_Status] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_31d33c06a394fd292ab4bb5db46] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_31d33c06a394fd292ab4bb5db46] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [UQ_86fdbf366b0963b03e939e7022f] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Provider] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_7a2621fd35607fb062d44dee9cc] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_7a2621fd35607fb062d44dee9cc] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [UQ_7f1cae2af368a26194ed4f380bb] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Exchange_Rate] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_65557fe039655b2c1aacc118cb1] DEFAULT newsequentialid(),
    [uf_value] DECIMAL(30,10) NOT NULL,
    [usd_value] DECIMAL(30,10) NOT NULL,
    [eur_value] DECIMAL(30,10) NOT NULL,
    [fecha] DATE NOT NULL,
    CONSTRAINT [IO::INP_Storage_Exchange_Rate_pk] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_ea849c4b073a96f9b7772d6b8a9] UNIQUE NONCLUSTERED ([fecha])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Factor] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_3f3f419649b0d342d85b4789466] DEFAULT newsequentialid(),
    [date] DATE NOT NULL,
    [mnemonic] VARCHAR(255) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [value] DECIMAL(30,10) NOT NULL,
    [parameterId] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_3f3f419649b0d342d85b4789466] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Instrument] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_a7d8e3de5e5d4b3044172dc794d] DEFAULT newsequentialid(),
    [mnemonic] VARCHAR(255) NOT NULL,
    [asset_type] VARCHAR(255),
    [country] VARCHAR(255),
    [coupon_rate] DECIMAL(30,10),
    [coupon_type] VARCHAR(255),
    [credit_rating] VARCHAR(255),
    [currency] VARCHAR(255),
    [dividend_yield] DECIMAL(30,10),
    [duration] DECIMAL(30,10),
    [equity_beta] DECIMAL(30,10),
    [industry_group] VARCHAR(255),
    [industry_sector] VARCHAR(255),
    [industry_subgroup] VARCHAR(255),
    [issuer] VARCHAR(255) NOT NULL CONSTRAINT [DF_d4f5a67491115b040f4e19f67df] DEFAULT '',
    [long_short] VARCHAR(255),
    [market_cap] DECIMAL(30,10),
    [maturity] DATE,
    [region] VARCHAR(255),
    [yield_to_maturity] DECIMAL(30,10),
    [mark_to_market_in_clp] DECIMAL(30,10) NOT NULL CONSTRAINT [DF_26102f52ee892db33a0d3064d9d] DEFAULT 0,
    [mark_to_market_in_native_currency] DECIMAL(30,10) NOT NULL CONSTRAINT [DF_abadbf876c995e0398d28e94c84] DEFAULT 0,
    [maturity_2] DECIMAL(30,10),
    [market] VARCHAR(255),
    [short_name] VARCHAR(255),
    [isin_or_cusip] VARCHAR(255),
    [secondary_asset_type] VARCHAR(255),
    [underlying] VARCHAR(255),
    [underlying_type] VARCHAR(255),
    [underlying_index] VARCHAR(255),
    [series] VARCHAR(255),
    [outstanding_shares] DECIMAL(30,10),
    [outstanding_balance] DECIMAL(30,10),
    [amortization_type] VARCHAR(255),
    [amortization] VARCHAR(255),
    [optionality] VARCHAR(255),
    [option_type] VARCHAR(255),
    [secondary_option_type] VARCHAR(255),
    [coupon_frequency] VARCHAR(255),
    [tir] DECIMAL(30,10),
    [accrued_interest] DECIMAL(30,10),
    [convexity] DECIMAL(30,10),
    [industry_subsector] VARCHAR(255),
    [issuing_date] DATE,
    [debt_type] VARCHAR(255),
    [notional] DECIMAL(30,10),
    [trade_price] DECIMAL(30,10),
    [strike_price] DECIMAL(30,10),
    [clean_price_in_clp] DECIMAL(30,10),
    [contract_size] DECIMAL(30,10),
    [feature_by_key] NTEXT NOT NULL CONSTRAINT [DF_ea11f547de68d3c838faf932599] DEFAULT '{}',
    CONSTRAINT [IO::INP_Storage_Instrument_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_MarketPrice] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_08c4769bc35bbee870e1b436ed6] DEFAULT newsequentialid(),
    [mnemonic] VARCHAR(255) NOT NULL,
    [process] VARCHAR(255) NOT NULL,
    [market_price] DECIMAL(26,8) NOT NULL,
    [correlative] VARCHAR(2),
    [business_date] DATE,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_afb93936f3454c589fa79d00de9] DEFAULT CURRENT_TIMESTAMP,
    [market] VARCHAR(255),
    CONSTRAINT [PK_08c4769bc35bbee870e1b436ed6] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Parameter] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_6b15909ce996c8a56439350bd81] DEFAULT newsequentialid(),
    [date] DATE NOT NULL,
    [mnemonic] VARCHAR(255) NOT NULL,
    [presence] DECIMAL(30,10) NOT NULL,
    [alpha] DECIMAL(30,10) NOT NULL,
    [issuance_date] DATE,
    [expiration_date] DATE,
    [risk] VARCHAR(255),
    [rate] DECIMAL(30,10),
    [duration] DECIMAL(30,10),
    [convexity] DECIMAL(30,10),
    [currency] VARCHAR(255),
    [market] VARCHAR(255),
    [group] VARCHAR(255),
    [family] VARCHAR(255),
    [error_deviation] DECIMAL(30,10),
    [valuation] DECIMAL(30,10),
    CONSTRAINT [PK_6b15909ce996c8a56439350bd81] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_PortfolioHierarchy] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_dd15fe79dd96f52de1af9c181e5] DEFAULT newsequentialid(),
    [portfolio_name] VARCHAR(255),
    [parent_book] VARCHAR(255),
    [processId] UNIQUEIDENTIFIER,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_b1d3ffd859afdc72a9e0a0d5490] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_dd15fe79dd96f52de1af9c181e5] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Position] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_2a8ec28e404fc81312714113721] DEFAULT newsequentialid(),
    [mnemonic] VARCHAR(100) NOT NULL,
    [time_stamp] DATETIME,
    [portfolio] VARCHAR(50) NOT NULL,
    [provider_id] VARCHAR(100),
    [business_date] DATETIME NOT NULL,
    [long_short] VARCHAR(10),
    [trading_desk] VARCHAR(100),
    [trader] VARCHAR(100),
    [custom] NTEXT,
    [load_id] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_4cfc59a9c955fbc7eeafb0711bf] DEFAULT CURRENT_TIMESTAMP,
    [label] VARCHAR(100),
    [record_type] VARCHAR(2),
    [units] BIGINT NOT NULL,
    [trading_price] DECIMAL(30,10),
    CONSTRAINT [PK_2a8ec28e404fc81312714113721] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Storage_Price] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_f372b4c372773898c28ba43d388] DEFAULT newsequentialid(),
    [time_stamp] DATETIME NOT NULL,
    [instrument_name] NVARCHAR(255) NOT NULL,
    [currency] NVARCHAR(255) NOT NULL,
    [load_id] UNIQUEIDENTIFIER,
    [business_date] DATETIME NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_fa4b6c32c5f7736869775301128] DEFAULT CURRENT_TIMESTAMP,
    [spot_price] DECIMAL(26,8) NOT NULL,
    CONSTRAINT [PK_f372b4c372773898c28ba43d388] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::INP_Type] (
    [id] VARCHAR(6) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [description] TEXT CONSTRAINT [DF_81f1b65dc5c75a6cb87dad99cd6] DEFAULT '',
    [headers] TEXT NOT NULL,
    [storage_table] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_c4c958ae215354fe8e48ad53ac5] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_c4c958ae215354fe8e48ad53ac5] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [UQ_405039e1262172326b478d680e7] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [UQ_322d5d43e8e2bf49c97d2a225bf] UNIQUE NONCLUSTERED ([storage_table])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Output] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_8ed31d81560aef7a473314fe423] DEFAULT newsequentialid(),
    [definition_entity_id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_80406f71fbcebfd24830e716b11] DEFAULT newsequentialid(),
    [type_id] VARCHAR(6),
    CONSTRAINT [PK_8ed31d81560aef7a473314fe423] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Process] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_273a1ffcd327230ea7bca91de22] DEFAULT newsequentialid(),
    [business_date] DATE NOT NULL,
    [started_at] DATETIME2 NOT NULL CONSTRAINT [DF_26f5cb552a7bfffae95d61db7d9] DEFAULT CURRENT_TIMESTAMP,
    [elapsed_milliseconds] BIGINT,
    [output_id] UNIQUEIDENTIFIER NOT NULL,
    [status_id] VARCHAR(3) NOT NULL,
    [finished_at] DATETIME,
    CONSTRAINT [PK_273a1ffcd327230ea7bca91de22] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Process_Status] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_cc5474cd08d992b22d4d91590da] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [IO::OUT_Process_Status_name_uq] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Storage_Session] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_551a50b171c98f95bc446f6e931] DEFAULT newsequentialid(),
    [output_process_id] UNIQUEIDENTIFIER NOT NULL,
    [intraday_time] TIME,
    [portfolio_id] UNIQUEIDENTIFIER NOT NULL,
    [postgres_id] VARCHAR(45),
    [bcs_price_type] VARCHAR(255),
    [correlative] VARCHAR(2),
    [market_prices_id] VARCHAR(255),
    CONSTRAINT [PK_551a50b171c98f95bc446f6e931] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [IO::OUT_Storage_Session_outputProcess&portfolioId_uq] UNIQUE NONCLUSTERED ([output_process_id],[portfolio_id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Storage_Simulation] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_b580397ea751bb56927defc45a4] DEFAULT newsequentialid(),
    [fecha] DATE NOT NULL,
    [nemo] VARCHAR(255) NOT NULL,
    [time] INT NOT NULL,
    [valor_base] DECIMAL(30,10) NOT NULL,
    [valor_t0] DECIMAL(30,10) NOT NULL,
    [e_values] NTEXT NOT NULL,
    CONSTRAINT [IO::OUT_Storage_Simulation_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type] (
    [id] VARCHAR(6) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [description] TEXT NOT NULL CONSTRAINT [DF_1c3c3e1d12d50d45ecb768adcba] DEFAULT '',
    [definition_table] VARCHAR(255) NOT NULL CONSTRAINT [DF_60dbee70fd2ecc2709be566f52c] DEFAULT '',
    [storage_table] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_09b34b5b1f481e853ec6d6bdda7] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [IO::OUT_Type_name&storageTable_uq] UNIQUE NONCLUSTERED ([name],[storage_table])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type_Session] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_8e4d2a69a475394ea0166d9c36d] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [session_date] DATE NOT NULL,
    [scheduled_cron_expression] VARCHAR(255),
    [output_id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [input_portfolio_id] UNIQUEIDENTIFIER NOT NULL,
    [status_id] VARCHAR(3) NOT NULL,
    [bcs_price_type] VARCHAR(255),
    [input_market_prices_id] VARCHAR(255),
    [labels] NTEXT,
    [share] BIT NOT NULL CONSTRAINT [DF_000482e113249fc6dda36988ccf] DEFAULT 0,
    CONSTRAINT [PK_8e4d2a69a475394ea0166d9c36d] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [IO::OUT_Type_Session_output&user_uq] UNIQUE NONCLUSTERED ([output_id],[user_id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type_Session_IntradayTime] (
    [type_session_id] UNIQUEIDENTIFIER NOT NULL,
    [intraday_time_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_5733251f9c8028d4df77f4292b6] PRIMARY KEY CLUSTERED ([type_session_id],[intraday_time_id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type_Session_Scenario] (
    [type_session_id] UNIQUEIDENTIFIER NOT NULL,
    [scenario_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_7900f2c3086939ca23979180f8f] PRIMARY KEY CLUSTERED ([type_session_id],[scenario_id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type_Session_Status] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_9ec4454f2c9f77874608377a07b] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[IO::OUT_Type_Session_TimeStep] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_6cce5bdce7daf4add36c782df0e] DEFAULT newsequentialid(),
    [relative_starting_day] INT NOT NULL,
    [relative_finishing_day] INT NOT NULL,
    [interval] INT NOT NULL,
    [task_id] UNIQUEIDENTIFIER NOT NULL,
    [interval_time_unit_id] VARCHAR(3) NOT NULL,
    CONSTRAINT [PK_6cce5bdce7daf4add36c782df0e] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Market::INS_Instrument] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_82bd7c75a4d1ded0a5e1da7219e] DEFAULT newsequentialid(),
    [mnemonic] VARCHAR(255) NOT NULL,
    [type_id] VARCHAR(3) NOT NULL,
    [classification_id] VARCHAR(2) NOT NULL,
    CONSTRAINT [PK_82bd7c75a4d1ded0a5e1da7219e] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Market::INS_Instrument_mnemonic_uq] UNIQUE NONCLUSTERED ([mnemonic])
);

-- CreateTable
CREATE TABLE [dbo].[migrations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [timestamp] BIGINT NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_8c82d7f526340ab734260ea46be] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[navigations] (
    [navigationId] INT NOT NULL IDENTITY(1,1),
    [id] NVARCHAR(500) NOT NULL,
    [title] NVARCHAR(255),
    [translate] NTEXT,
    [subtitle] NVARCHAR(255),
    [url] NVARCHAR(255),
    [type] NVARCHAR(255),
    [icon] NVARCHAR(255),
    [disabled] BIT,
    [active] BIT,
    [badge] NTEXT,
    [neededPermissions] NTEXT,
    [neededRoles] NTEXT,
    [componentConfig] NTEXT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_0e1df193dd93d767d89c81e623b] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_e14150a8c4ff2bc536d05ec006c] DEFAULT CURRENT_TIMESTAMP,
    [mpath] NVARCHAR(255) CONSTRAINT [DF_9959b8f4b23951e142f8758ad36] DEFAULT '',
    [parentNavigationId] INT,
    CONSTRAINT [PK_79822ef1c1c9387eeef2bfc172b] PRIMARY KEY CLUSTERED ([navigationId]),
    CONSTRAINT [UQ_3f38689f82ca58a9ed44bc560ae] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Participant::CMP_Company] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_35aae0c8649fec95c91582fdc93] DEFAULT newsequentialid(),
    [business_name] NVARCHAR(255) NOT NULL,
    [person_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_35aae0c8649fec95c91582fdc93] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_be7a6971785b42378aaa7114a88] UNIQUE NONCLUSTERED ([business_name])
);

-- CreateTable
CREATE TABLE [dbo].[Participant::PER_Email] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_e04a1e302a9afb06ebfc033c7f2] DEFAULT newsequentialid(),
    [email] NVARCHAR(255) NOT NULL,
    [person_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_e04a1e302a9afb06ebfc033c7f2] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_0852b7baaaa7a37afffcbbdee22] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Participant::PER_Person] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_b5a3ad11bd82923c1da71a7467e] DEFAULT newsequentialid(),
    [first_name] NVARCHAR(255) NOT NULL,
    [last_name] NVARCHAR(255) NOT NULL,
    CONSTRAINT [PK_b5a3ad11bd82923c1da71a7467e] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Participant::USR_Configuration] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_68ddb4c7986d734524a030d0289] DEFAULT newsequentialid(),
    [parameter_code] NVARCHAR(255) NOT NULL,
    [parameter_value] NVARCHAR(2048) NOT NULL,
    [parameter_data_type] NVARCHAR(50) NOT NULL,
    [validations] NTEXT,
    [description] NVARCHAR(255) NOT NULL,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_131c75acb83ac2e855125b22387] DEFAULT CURRENT_TIMESTAMP,
    [userId] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_68ddb4c7986d734524a030d0289] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[permissions] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_920331560282b8bd21bb02290df] DEFAULT newsequentialid(),
    [name] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_da04f89054f39981438894dfe30] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_14936cb23d7de4c7b31b5cef053] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_920331560282b8bd21bb02290df] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::CMN_IntradayTime] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_23d0e4e88100c29c0dff8a27cce] DEFAULT newsequentialid(),
    [time] TIME NOT NULL,
    CONSTRAINT [PK_23d0e4e88100c29c0dff8a27cce] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Platform::CMN_IntradayTime_time_uq] UNIQUE NONCLUSTERED ([time])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::CMN_TimeUnit] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_8ea4a8b2313f183935e02127633] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Platform::CMN_TimeUnit_name_uq] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::HLP_Category] (
    [id] VARCHAR(3) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_c473aa62a38461ae1e5aeec8715] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::HLP_Documentation] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_cf5d059b0191433e8c89199fc82] DEFAULT newsequentialid(),
    [header] VARCHAR(255) NOT NULL,
    [content] TEXT NOT NULL,
    [position] INT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_3176c198448a4f954d9d456f847] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME NOT NULL CONSTRAINT [DF_91852e0700e2aa3962d8541ba8b] DEFAULT CURRENT_TIMESTAMP,
    [language] VARCHAR(2) NOT NULL,
    [depth] INT NOT NULL,
    [user_id] UNIQUEIDENTIFIER,
    [parent_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_cf5d059b0191433e8c89199fc82] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::HLP_Documentation_closure] (
    [id_ancestor] UNIQUEIDENTIFIER NOT NULL,
    [id_descendant] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_0f7d106523b52a1335f836413c3] PRIMARY KEY CLUSTERED ([id_ancestor],[id_descendant])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::HLP_Help] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_dcaf6fd49c91b4fd299a56d0fff] DEFAULT newsequentialid(),
    [subject] VARCHAR(255) NOT NULL,
    [message] TEXT NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_473866ae7e229e55e46cd66eb4a] DEFAULT CURRENT_TIMESTAMP,
    [user_id] UNIQUEIDENTIFIER,
    [category_id] VARCHAR(3),
    CONSTRAINT [PK_dcaf6fd49c91b4fd299a56d0fff] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Platform::HLP_HelpFile] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_a4d58c9bde1247efe50b27fc1e1] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [data] VARBINARY(max) NOT NULL,
    [extension] VARCHAR(3) NOT NULL,
    [created_at] DATETIME NOT NULL CONSTRAINT [DF_76ed461322126bd8f4148705273] DEFAULT CURRENT_TIMESTAMP,
    [help_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_a4d58c9bde1247efe50b27fc1e1] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Playground::PGD_TypeAmalgamation] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_cd1be066da786be60e1e1e4d73b] DEFAULT newsequentialid(),
    [attribute_varchar] VARCHAR(255),
    [attribute_text] TEXT,
    [attribute_simple_json] NTEXT,
    [attribute_tinyint] TINYINT,
    [attribute_simple_enum] NVARCHAR(255),
    [attribute_varbinary] VARBINARY(max),
    [attribute_date] DATE,
    [attribute_datetime] DATETIME,
    [attribute_int] INT,
    [attribute_float] FLOAT(53),
    [attribute_numeric] DECIMAL(30,10),
    [attribute_decimal] DECIMAL(30,10),
    [attribute_time] TIME,
    [attribute_bigint] BIGINT,
    [attribute_uuid] UNIQUEIDENTIFIER,
    [attribute_integer] INT,
    [attribute_value_id] UNIQUEIDENTIFIER,
    CONSTRAINT [Playground::PGD_TypeAmalgamation_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Playground::PGD_Value] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_a8f4a769f4adbf920185a320c2c] DEFAULT newsequentialid(),
    [description] VARCHAR(255) NOT NULL,
    [dec_p30_s10] DECIMAL(30,10) NOT NULL,
    [dec_p26_s8] DECIMAL(26,8) NOT NULL,
    CONSTRAINT [Playground::PGD_Value_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Classification] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_afc7517b542a242638093508399] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_afc7517b542a242638093508399] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Element] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_8d07a3931ec6a494bd8ac871d57] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255) NOT NULL,
    [type] NVARCHAR(255) NOT NULL,
    [payload_schema] NTEXT,
    CONSTRAINT [PK_8d07a3931ec6a494bd8ac871d57] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Element_Configuration] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(255) NOT NULL,
    [configuration] NTEXT,
    [layoutId] UNIQUEIDENTIFIER,
    [userId] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_762135c30e0e8f5b4abc118a765] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Layout] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_c494386f6a2531377c6127cb2e7] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255) NOT NULL,
    [componentConfig] NTEXT,
    CONSTRAINT [PK_c494386f6a2531377c6127cb2e7] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Metric_Type] (
    [id] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255) NOT NULL,
    [payload_json_schema] NTEXT,
    CONSTRAINT [Reporting::RPT_Metric_Type_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Template] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_83e894d02e6b501f9ce9c270a09] DEFAULT newsequentialid(),
    [name] VARCHAR(255) NOT NULL,
    [description] VARCHAR(255) NOT NULL,
    [is_predefined] TINYINT NOT NULL,
    [user_id] UNIQUEIDENTIFIER,
    [layout_id] UNIQUEIDENTIFIER,
    [classification_id] UNIQUEIDENTIFIER,
    [payload] NTEXT,
    CONSTRAINT [PK_83e894d02e6b501f9ce9c270a09] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Template_Element] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_d2e0732eb1daf610f07e01f1cb4] DEFAULT newsequentialid(),
    [position] INT NOT NULL,
    [visibility] TINYINT NOT NULL CONSTRAINT [DF_bc956d8333493b7e9e39a08e42b] DEFAULT 1,
    [report_template_id] UNIQUEIDENTIFIER NOT NULL,
    [element_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_d2e0732eb1daf610f07e01f1cb4] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Template_Metric] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_085e66e7a05d24484f7c02b4443] DEFAULT newsequentialid(),
    [payload] NTEXT,
    [metric_type_id] VARCHAR(255) NOT NULL,
    [report_template_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [Reporting::RPT_Template_Metric_pk] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reporting::RPT_Template_Powerbi] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_1c695e409c51dd32b776e424947] DEFAULT newsequentialid(),
    [json] TEXT NOT NULL,
    [report_template_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_1c695e409c51dd32b776e424947] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_c1433d71a4838793a49dcad46ab] DEFAULT newsequentialid(),
    [name] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(255) NOT NULL,
    [isAdmin] BIT NOT NULL CONSTRAINT [DF_4b83870e2f191978f0374af71a5] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_4d018866397b1e7e78d03b45662] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_c13070745ded32a88c920015f7e] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_c1433d71a4838793a49dcad46ab] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[roles_permissions] (
    [roleId] UNIQUEIDENTIFIER NOT NULL,
    [permissionId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_5829481fc2a13d85b9b6bf3bd53] PRIMARY KEY CLUSTERED ([roleId],[permissionId])
);

-- CreateTable
CREATE TABLE [dbo].[Scenario::SCN_Factor] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_c6d9d58c99ada55851b405a7924] DEFAULT newsequentialid(),
    [family_type] NVARCHAR(255) NOT NULL,
    [short_name] NVARCHAR(255) NOT NULL,
    [long_name] NVARCHAR(255) NOT NULL,
    [formatted_name] NVARCHAR(255) NOT NULL,
    CONSTRAINT [PK_c6d9d58c99ada55851b405a7924] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_c65404dd8809b639100d4940cfe] UNIQUE NONCLUSTERED ([short_name])
);

-- CreateTable
CREATE TABLE [dbo].[Scenario::SCN_Scenario] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_df08793ed2a764a5dc1fdddd446] DEFAULT newsequentialid(),
    [name] NVARCHAR(255) NOT NULL,
    [type] NVARCHAR(255) NOT NULL,
    [number_scenarios] INT NOT NULL CONSTRAINT [DF_b584373dcaee54d01eca5f51175] DEFAULT 1,
    [time_horizon] INT NOT NULL CONSTRAINT [DF_98bf0e46c79f4cabafd97c02f54] DEFAULT 1,
    [userId] UNIQUEIDENTIFIER,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_f8417809fa312df7eea52c02316] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_df08793ed2a764a5dc1fdddd446] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_9e9fd748a7b3a41dc50b16360fe] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Scenario::SCN_ScenarioFactor] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_74881019ed38cfea321b5dba4bb] DEFAULT newsequentialid(),
    [scenarioId] UNIQUEIDENTIFIER,
    [factorId] UNIQUEIDENTIFIER,
    [shock] DECIMAL(26,8) NOT NULL CONSTRAINT [DF_6613de3f600f1d07e30ec01fe25] DEFAULT 0,
    CONSTRAINT [PK_74881019ed38cfea321b5dba4bb] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Sceneracio::SCN_ScenarioFactor] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_73573ea66d6b3bd186d7840c4a3] DEFAULT newsequentialid(),
    [shock] INT NOT NULL CONSTRAINT [DF_a4e0cd517eb81c98b721e723503] DEFAULT 0,
    [scenarioId] UNIQUEIDENTIFIER,
    [factorId] UNIQUEIDENTIFIER,
    CONSTRAINT [PK_73573ea66d6b3bd186d7840c4a3] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[type_session_intraday_time] (
    [type_session_id] UNIQUEIDENTIFIER NOT NULL,
    [intraday_time_id] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_c5e34582e3d9c90d09c30524a4e] PRIMARY KEY CLUSTERED ([type_session_id],[intraday_time_id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF_a3ffb1c0c8416b9fc6f907b7433] DEFAULT newsequentialid(),
    [photoUrl] NVARCHAR(255),
    [email] NVARCHAR(255) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF_204e9b624861ff4a5b268192101] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL CONSTRAINT [DF_0f5cbe00928ba4489cc7312573b] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_a3ffb1c0c8416b9fc6f907b7433] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ_97672ac88f789774dd47f7c8be3] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[users_permissions] (
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [permissionId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_37136eea4d2e5cd360a7c7cfe10] PRIMARY KEY CLUSTERED ([userId],[permissionId])
);

-- CreateTable
CREATE TABLE [dbo].[users_roles] (
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [roleId] UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT [PK_a472bd14ea5d26f611025418d57] PRIMARY KEY CLUSTERED ([userId],[roleId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_344f4f62ee258e34144018ad01] ON [dbo].[IO::OUT_Type_Session_IntradayTime]([type_session_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_fd17eef3c337d8967dc4d951f1] ON [dbo].[IO::OUT_Type_Session_IntradayTime]([intraday_time_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_829070501d5d89d135d900c71c] ON [dbo].[IO::OUT_Type_Session_Scenario]([type_session_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_a17af262378d68fb6a6eb5729a] ON [dbo].[IO::OUT_Type_Session_Scenario]([scenario_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_605f9fbbe29c40c3bc9e4d35a5] ON [dbo].[Platform::HLP_Documentation_closure]([id_ancestor]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_6965ae3d6a36dd3861f885ac1d] ON [dbo].[Platform::HLP_Documentation_closure]([id_descendant]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_28bf280551eb9aa82daf1e156d] ON [dbo].[roles_permissions]([roleId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_31cf5c31d0096f706e3ba3b1e8] ON [dbo].[roles_permissions]([permissionId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_01fcc606f6287f66d5d47817ad] ON [dbo].[type_session_intraday_time]([type_session_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_9eb490f10becc9d468a85647bb] ON [dbo].[type_session_intraday_time]([intraday_time_id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_4180c1a3fdc77c74e9ad3a387f] ON [dbo].[users_permissions]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_a7fc06687add3a4da3ddbbb406] ON [dbo].[users_permissions]([permissionId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_4fb14631257670efa14b15a3d8] ON [dbo].[users_roles]([roleId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IDX_776b7cf9330802e5ef5a8fb18d] ON [dbo].[users_roles]([userId]);

-- AddForeignKey
ALTER TABLE [dbo].[Aggregation::AGG_Aggregation] ADD CONSTRAINT [FK_acb2a2d8c4332892de004233ca9] FOREIGN KEY ([user_id]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Aggregation::AGG_AggregationAttribute] ADD CONSTRAINT [FK_08c785c2c7742465d19a31e10d3] FOREIGN KEY ([aggregationId]) REFERENCES [dbo].[Aggregation::AGG_Aggregation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Aggregation::AGG_AggregationAttribute] ADD CONSTRAINT [FK_a0780a565c333eb8e0a6d762c72] FOREIGN KEY ([attributeId]) REFERENCES [dbo].[Aggregation::AGG_Attribute]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Aggregation::AGG_Attribute] ADD CONSTRAINT [FK_2b3eebb3caf234d4960fd0f15f0] FOREIGN KEY ([user_id]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_ExternalAttributeMapping] ADD CONSTRAINT [IO::INP_ExternalEntityContainerMapping_eecm_fk] FOREIGN KEY ([external_entity_container_id]) REFERENCES [dbo].[IO::INP_ExternalEntityContainerMapping]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_ExternalEntityContainerMapping] ADD CONSTRAINT [IO::INP_ExternalEntityContainerMapping_ec_fk] FOREIGN KEY ([external_container_id]) REFERENCES [dbo].[IO::INP_ExternalContainer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_ExternalEntityContainerMapping] ADD CONSTRAINT [IO::INP_ExternalEntityContainerMapping_eem_fk] FOREIGN KEY ([external_entity_mapping_id]) REFERENCES [dbo].[IO::INP_ExternalEntityMapping]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Files] ADD CONSTRAINT [FK_ec50860b2332cccde13d505517e] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Input] ADD CONSTRAINT [FK_0b06bf439c4a96242fff8f8a9e8] FOREIGN KEY ([type_id]) REFERENCES [dbo].[IO::INP_Type]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Input] ADD CONSTRAINT [FK_7eb9b636a29e4c29e281222dce2] FOREIGN KEY ([provider_id]) REFERENCES [dbo].[IO::INP_Provider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Process] ADD CONSTRAINT [FK_1e664609613bc4a159aae978b6b] FOREIGN KEY ([statusId]) REFERENCES [dbo].[IO::INP_Process_Status]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Process] ADD CONSTRAINT [FK_2a2cdc791c48f0314a445e682d5] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Process] ADD CONSTRAINT [FK_aa99995f9a3f13c9c3172e2ac85] FOREIGN KEY ([inputId]) REFERENCES [dbo].[IO::INP_Input]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Storage_Factor] ADD CONSTRAINT [FK_dec71a8c93f1534984274353a55] FOREIGN KEY ([parameterId]) REFERENCES [dbo].[IO::INP_Storage_Parameter]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Storage_PortfolioHierarchy] ADD CONSTRAINT [FK_bb6ae38bd398428a6f6d3595314] FOREIGN KEY ([processId]) REFERENCES [dbo].[IO::INP_Process]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Storage_Position] ADD CONSTRAINT [FK_93bb5cfe85fc75b0dbb0940ba6e] FOREIGN KEY ([load_id]) REFERENCES [dbo].[IO::INP_Process]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::INP_Storage_Price] ADD CONSTRAINT [FK_5eb367c0c206fafc9c5a57de4ff] FOREIGN KEY ([load_id]) REFERENCES [dbo].[IO::INP_Process]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Output] ADD CONSTRAINT [FK_63b764e3020337a64b99324feb7] FOREIGN KEY ([type_id]) REFERENCES [dbo].[IO::OUT_Type]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Process] ADD CONSTRAINT [FK_89b3f637f64a54095644dd4472d] FOREIGN KEY ([output_id]) REFERENCES [dbo].[IO::OUT_Output]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Process] ADD CONSTRAINT [FK_bb2074895c129387769735b4d71] FOREIGN KEY ([status_id]) REFERENCES [dbo].[IO::OUT_Process_Status]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Storage_Session] ADD CONSTRAINT [FK_8143fa5b4c45ba8e6b564eef7e9] FOREIGN KEY ([output_process_id]) REFERENCES [dbo].[IO::OUT_Process]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session] ADD CONSTRAINT [FK_03cca51b1b9f9248d1c5c766df2] FOREIGN KEY ([output_id]) REFERENCES [dbo].[IO::OUT_Output]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session] ADD CONSTRAINT [FK_12d7217c943f0606312383578c1] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session] ADD CONSTRAINT [FK_a9d397cbd1ad7ff589179bcbbaa] FOREIGN KEY ([status_id]) REFERENCES [dbo].[IO::OUT_Type_Session_Status]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session] ADD CONSTRAINT [FK_c9dd645f482b84bc4193060a7c5] FOREIGN KEY ([input_portfolio_id]) REFERENCES [dbo].[IO::INP_Process]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_IntradayTime] ADD CONSTRAINT [FK_344f4f62ee258e34144018ad01f] FOREIGN KEY ([type_session_id]) REFERENCES [dbo].[IO::OUT_Type_Session]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_IntradayTime] ADD CONSTRAINT [FK_fd17eef3c337d8967dc4d951f14] FOREIGN KEY ([intraday_time_id]) REFERENCES [dbo].[Platform::CMN_IntradayTime]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_Scenario] ADD CONSTRAINT [FK_829070501d5d89d135d900c71ca] FOREIGN KEY ([type_session_id]) REFERENCES [dbo].[IO::OUT_Type_Session]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_Scenario] ADD CONSTRAINT [FK_a17af262378d68fb6a6eb5729aa] FOREIGN KEY ([scenario_id]) REFERENCES [dbo].[Scenario::SCN_Scenario]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_TimeStep] ADD CONSTRAINT [FK_2e080abce87b2176a3500014f13] FOREIGN KEY ([task_id]) REFERENCES [dbo].[IO::OUT_Type_Session]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[IO::OUT_Type_Session_TimeStep] ADD CONSTRAINT [FK_efd373f005ae569bde445adf94d] FOREIGN KEY ([interval_time_unit_id]) REFERENCES [dbo].[Platform::CMN_TimeUnit]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[navigations] ADD CONSTRAINT [FK_42644ac0a872b695b2e418aefb0] FOREIGN KEY ([parentNavigationId]) REFERENCES [dbo].[navigations]([navigationId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Participant::CMP_Company] ADD CONSTRAINT [FK_0d8489c852a689218b1c22115b5] FOREIGN KEY ([person_id]) REFERENCES [dbo].[Participant::PER_Person]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Participant::PER_Email] ADD CONSTRAINT [FK_a11ffa46d541fcd0f0386a3e444] FOREIGN KEY ([person_id]) REFERENCES [dbo].[Participant::PER_Person]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Participant::USR_Configuration] ADD CONSTRAINT [FK_5d9a876df5b9b5fa4d5069620c7] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Documentation] ADD CONSTRAINT [FK_dc05a0d91e4c3f62b11d58e14d6] FOREIGN KEY ([parent_id]) REFERENCES [dbo].[Platform::HLP_Documentation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Documentation] ADD CONSTRAINT [FK_fa89bfac2b8a11103b5c5d5d691] FOREIGN KEY ([user_id]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Documentation_closure] ADD CONSTRAINT [FK_605f9fbbe29c40c3bc9e4d35a55] FOREIGN KEY ([id_ancestor]) REFERENCES [dbo].[Platform::HLP_Documentation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Documentation_closure] ADD CONSTRAINT [FK_6965ae3d6a36dd3861f885ac1d1] FOREIGN KEY ([id_descendant]) REFERENCES [dbo].[Platform::HLP_Documentation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Help] ADD CONSTRAINT [FK_5190ae1824182dc6064f91a5336] FOREIGN KEY ([category_id]) REFERENCES [dbo].[Platform::HLP_Category]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_Help] ADD CONSTRAINT [FK_ad141149b2fa25019595f6d270f] FOREIGN KEY ([user_id]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Platform::HLP_HelpFile] ADD CONSTRAINT [FK_8f47406e8b8163be4d7521d074b] FOREIGN KEY ([help_id]) REFERENCES [dbo].[Platform::HLP_Help]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Playground::PGD_TypeAmalgamation] ADD CONSTRAINT [Playground::PGD_TypeAmalgamation_value_fk] FOREIGN KEY ([attribute_value_id]) REFERENCES [dbo].[Playground::PGD_Value]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Element_Configuration] ADD CONSTRAINT [FK_c0c1d0defba28231872a1692e78] FOREIGN KEY ([userId]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Element_Configuration] ADD CONSTRAINT [FK_f2d9590e408fec1567cef501acd] FOREIGN KEY ([layoutId]) REFERENCES [dbo].[Reporting::RPT_Layout]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template] ADD CONSTRAINT [Reporting::RPT_Template_classification_fk] FOREIGN KEY ([classification_id]) REFERENCES [dbo].[Reporting::RPT_Classification]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template] ADD CONSTRAINT [Reporting::RPT_Template_layout_fk] FOREIGN KEY ([layout_id]) REFERENCES [dbo].[Reporting::RPT_Layout]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template] ADD CONSTRAINT [Reporting::RPT_Template_user_fk] FOREIGN KEY ([user_id]) REFERENCES [dbo].[AccessControl::USR_User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template_Element] ADD CONSTRAINT [Reporting::RPT_Template_Element_element_fk] FOREIGN KEY ([element_id]) REFERENCES [dbo].[Reporting::RPT_Element]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template_Element] ADD CONSTRAINT [Reporting::RPT_Template_Element_template_fk] FOREIGN KEY ([report_template_id]) REFERENCES [dbo].[Reporting::RPT_Template]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template_Metric] ADD CONSTRAINT [Reporting::RPT_Template_Metric_metric_type_fk] FOREIGN KEY ([metric_type_id]) REFERENCES [dbo].[Reporting::RPT_Metric_Type]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template_Metric] ADD CONSTRAINT [Reporting::RPT_Template_Metric_report_template_fk] FOREIGN KEY ([report_template_id]) REFERENCES [dbo].[Reporting::RPT_Template]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reporting::RPT_Template_Powerbi] ADD CONSTRAINT [FK_48a7f617847c49e8cf108a6d963] FOREIGN KEY ([report_template_id]) REFERENCES [dbo].[Reporting::RPT_Template]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[roles_permissions] ADD CONSTRAINT [FK_28bf280551eb9aa82daf1e156d9] FOREIGN KEY ([roleId]) REFERENCES [dbo].[roles]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[roles_permissions] ADD CONSTRAINT [FK_31cf5c31d0096f706e3ba3b1e82] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[permissions]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Scenario::SCN_Scenario] ADD CONSTRAINT [FK_8498b51468a8a249eb3031fd1b6] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Scenario::SCN_ScenarioFactor] ADD CONSTRAINT [FK_37bbf54455dbf6b580a4cf0ae4b] FOREIGN KEY ([factorId]) REFERENCES [dbo].[Scenario::SCN_Factor]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Scenario::SCN_ScenarioFactor] ADD CONSTRAINT [FK_c28b3a0d497b84aef3d0a34cac1] FOREIGN KEY ([scenarioId]) REFERENCES [dbo].[Scenario::SCN_Scenario]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Sceneracio::SCN_ScenarioFactor] ADD CONSTRAINT [FK_24e73ccbab7752a3dee4b69c116] FOREIGN KEY ([scenarioId]) REFERENCES [dbo].[Scenario::SCN_Scenario]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Sceneracio::SCN_ScenarioFactor] ADD CONSTRAINT [FK_f1dbf9be47b9f4d1b60117a7bd7] FOREIGN KEY ([factorId]) REFERENCES [dbo].[Scenario::SCN_Factor]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[type_session_intraday_time] ADD CONSTRAINT [FK_01fcc606f6287f66d5d47817ade] FOREIGN KEY ([type_session_id]) REFERENCES [dbo].[IO::OUT_Type_Session]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[type_session_intraday_time] ADD CONSTRAINT [FK_9eb490f10becc9d468a85647bbc] FOREIGN KEY ([intraday_time_id]) REFERENCES [dbo].[Platform::CMN_IntradayTime]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users_permissions] ADD CONSTRAINT [FK_4180c1a3fdc77c74e9ad3a387f2] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users_permissions] ADD CONSTRAINT [FK_a7fc06687add3a4da3ddbbb406f] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[permissions]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users_roles] ADD CONSTRAINT [FK_4fb14631257670efa14b15a3d86] FOREIGN KEY ([roleId]) REFERENCES [dbo].[roles]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users_roles] ADD CONSTRAINT [FK_776b7cf9330802e5ef5a8fb18dc] FOREIGN KEY ([userId]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

