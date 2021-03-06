USE [master]
GO
/****** Object:  Database [Purchase_order_list]    Script Date: 11/07/2021 16:37:14 ******/
CREATE DATABASE [Purchase_order_list]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Purchase_order_list', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Purchase_order_list.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Purchase_order_list_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Purchase_order_list_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Purchase_order_list] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Purchase_order_list].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Purchase_order_list] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Purchase_order_list] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Purchase_order_list] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Purchase_order_list] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Purchase_order_list] SET ARITHABORT OFF 
GO
ALTER DATABASE [Purchase_order_list] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Purchase_order_list] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Purchase_order_list] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Purchase_order_list] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Purchase_order_list] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Purchase_order_list] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Purchase_order_list] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Purchase_order_list] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Purchase_order_list] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Purchase_order_list] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Purchase_order_list] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Purchase_order_list] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Purchase_order_list] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Purchase_order_list] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Purchase_order_list] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Purchase_order_list] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Purchase_order_list] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Purchase_order_list] SET RECOVERY FULL 
GO
ALTER DATABASE [Purchase_order_list] SET  MULTI_USER 
GO
ALTER DATABASE [Purchase_order_list] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Purchase_order_list] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Purchase_order_list] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Purchase_order_list] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Purchase_order_list] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Purchase_order_list] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Purchase_order_list', N'ON'
GO
ALTER DATABASE [Purchase_order_list] SET QUERY_STORE = OFF
GO
USE [Purchase_order_list]
GO
/****** Object:  Table [dbo].[ProductOrderLine]    Script Date: 11/07/2021 16:37:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductOrderLine](
	[Part_Number] [nchar](10) NOT NULL,
	[Part_Des] [nvarchar](50) NOT NULL,
	[Manufacturer] [nvarchar](10) NOT NULL,
	[Qty_Order] [int] NOT NULL,
	[Buy_Price] [money] NOT NULL,
	[Order_Date] [nvarchar](50) NOT NULL,
	[Memo] [nvarchar](150) NULL,
	[Order_No] [int] NOT NULL,
 CONSTRAINT [PK_ProductOrderLine] PRIMARY KEY CLUSTERED 
(
	[Part_Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductOrderList]    Script Date: 11/07/2021 16:37:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductOrderList](
	[Order_No] [int] NOT NULL,
	[Supplier] [nchar](10) NOT NULL,
	[Stock_Site] [nchar](10) NOT NULL,
	[Stock_Name] [nvarchar](50) NOT NULL,
	[Order_Date] [nvarchar](50) NOT NULL,
	[Last_Update] [nvarchar](50) NOT NULL,
	[Supplier_name] [nvarchar](50) NULL,
	[Address] [nvarchar](100) NOT NULL,
	[Note] [nvarchar](1000) NULL,
	[Country] [nvarchar](20) NOT NULL,
	[Post_Code] [nchar](10) NOT NULL,
	[Cancel] [bit] NOT NULL,
 CONSTRAINT [PK_ProductOrderList] PRIMARY KEY CLUSTERED 
(
	[Order_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [Purchase_order_list] SET  READ_WRITE 
GO
