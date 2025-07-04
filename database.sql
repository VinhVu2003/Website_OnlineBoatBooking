USE [Boat_Book2]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](100) NULL,
	[Password] [nvarchar](255) NULL,
	[Role] [nvarchar](50) NULL,
	[Status] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Amenities]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Amenities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Article]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Article](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NULL,
	[Content] [nvarchar](max) NULL,
	[AuthorId] [int] NULL,
	[CategoryId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ArticleCategory]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticleCategory](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Boat]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boat](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[LocationId] [int] NULL,
	[Owner_ID] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[IMG] [nvarchar](255) NULL,
	[Full_Price] [float] NULL,
	[Cabin_Count] [int] NULL,
	[OtherInfo] [nvarchar](255) NULL,
	[Status] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Boat_Amenities]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boat_Amenities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[AmenityId] [int] NULL,
	[BoatID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NULL,
	[BoatID] [int] NULL,
	[BookingDate] [datetime] NULL,
	[CheckInDate] [datetime] NULL,
	[CheckOutDate] [datetime] NULL,
	[Booking_Method] [nvarchar](50) NULL,
	[Total_Price] [float] NULL,
	[Status] [nvarchar](50) NULL,
	[IsFullBoat] [nvarchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking_Details]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking_Details](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BookingID] [int] NULL,
	[RoomId] [int] NULL,
	[Gia] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cus_Feedback]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cus_Feedback](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CusID] [int] NULL,
	[BoatID] [int] NULL,
	[F_Date] [datetime] NULL,
	[Rating] [nvarchar](250) NULL,
	[Comment] [nvarchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Sex] [nvarchar](10) NULL,
	[Address] [nvarchar](255) NULL,
	[Phone] [nvarchar](15) NULL,
	[Email] [nvarchar](100) NULL,
	[Account_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discount](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[D_AmountMax] [float] NULL,
	[D_Percentage] [float] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[Quantity] [int] NULL,
	[Description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FAQ_and_generalrule]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FAQ_and_generalrule](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NULL,
	[Content] [nvarchar](max) NULL,
	[AuthorId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Introduce_B]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Introduce_B](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BoatID] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[IMG] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[IMG] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Owner]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Owner](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Phone] [nvarchar](15) NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BookingID] [int] NULL,
	[P_Date] [datetime] NULL,
	[P_Method] [datetime] NULL,
	[Total_Price] [float] NULL,
	[PaymentMethod] [nvarchar](50) NULL,
	[Status] [nvarchar](50) NULL,
	[Content] [nvarchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Price]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Price](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[RoomID] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[OriginalPrice] [float] NULL,
	[DiscountedPrice] [float] NULL,
	[Discount_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Room]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Room](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BoatID] [int] NULL,
	[RoomName] [nvarchar](100) NULL,
	[PeopleCount] [int] NULL,
	[Size] [nvarchar](50) NULL,
	[Image] [nvarchar](255) NULL,
	[Quantity] [int] NULL,
	[Status] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[Sex] [nvarchar](10) NULL,
	[Email] [nvarchar](100) NULL,
	[Phone] [nvarchar](15) NULL,
	[Address] [nvarchar](255) NULL,
	[Position] [nvarchar](50) NULL,
	[Account_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trip]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trip](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BoatID] [int] NULL,
	[Str_Date] [datetime] NULL,
	[Ed_Date] [datetime] NULL,
	[Schedule] [nvarchar](255) NULL,
	[Duration] [nvarchar](max) NULL,
	[Detail] [nvarchar](max) NULL,
	[Dock] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  DEFAULT ('Active') FOR [Status]
GO
ALTER TABLE [dbo].[Booking] ADD  DEFAULT ('0') FOR [IsFullBoat]
GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Staff] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Article]  WITH CHECK ADD FOREIGN KEY([CategoryId])
REFERENCES [dbo].[ArticleCategory] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Boat]  WITH CHECK ADD FOREIGN KEY([LocationId])
REFERENCES [dbo].[Location] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Boat]  WITH CHECK ADD FOREIGN KEY([Owner_ID])
REFERENCES [dbo].[Owner] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Boat_Amenities]  WITH CHECK ADD FOREIGN KEY([AmenityId])
REFERENCES [dbo].[Amenities] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Boat_Amenities]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Booking_Details]  WITH CHECK ADD FOREIGN KEY([BookingID])
REFERENCES [dbo].[Booking] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Booking_Details]  WITH CHECK ADD FOREIGN KEY([RoomId])
REFERENCES [dbo].[Room] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cus_Feedback]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cus_Feedback]  WITH CHECK ADD FOREIGN KEY([CusID])
REFERENCES [dbo].[Customer] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Customer]  WITH CHECK ADD FOREIGN KEY([Account_ID])
REFERENCES [dbo].[Account] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[FAQ_and_generalrule]  WITH CHECK ADD FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Staff] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Introduce_B]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Payment]  WITH CHECK ADD FOREIGN KEY([BookingID])
REFERENCES [dbo].[Booking] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Price]  WITH CHECK ADD FOREIGN KEY([Discount_ID])
REFERENCES [dbo].[Discount] ([ID])
GO
ALTER TABLE [dbo].[Price]  WITH CHECK ADD FOREIGN KEY([RoomID])
REFERENCES [dbo].[Room] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Room]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Staff]  WITH CHECK ADD FOREIGN KEY([Account_ID])
REFERENCES [dbo].[Account] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Trip]  WITH CHECK ADD FOREIGN KEY([BoatID])
REFERENCES [dbo].[Boat] ([ID])
ON DELETE CASCADE
GO
/****** Object:  StoredProcedure [dbo].[GetAllBoatOwnerLocationTrip]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllBoatOwnerLocationTrip]
AS
BEGIN
    SELECT 
        b.*,o.Name as OwnerName,l.Name as LocationName,t.Schedule
    FROM 
        Boat b
    LEFT JOIN Owner o ON b.Owner_ID = o.ID
    LEFT JOIN Location l ON b.LocationId = l.ID
    LEFT JOIN Trip t ON b.ID = t.BoatID;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetBoatByID]    Script Date: 14/06/2025 10:44:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetBoatByID](
    @BoatID INT)
AS
BEGIN
    SELECT 
        b.*, 
        o.Name AS OwnerName, 
        l.Name AS LocationName, 
        t.Schedule,
		t.Detail,
		t.Str_Date,
		t.Ed_Date,
		t.Dock,
		t.Duration
    FROM 
        Boat b
    LEFT JOIN Owner o ON b.Owner_ID = o.ID
    LEFT JOIN Location l ON b.LocationId = l.ID
    LEFT JOIN Trip t ON b.ID = t.BoatID
    WHERE 
        b.ID = @BoatID;
END;
GO
