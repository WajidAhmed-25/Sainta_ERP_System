-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2024 at 11:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sante_erp_system`
--
CREATE DATABASE IF NOT EXISTS `sante_erp_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sante_erp_system`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `selectedService` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `contactEmail` varchar(255) NOT NULL,
  `Bussiness_ID` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_management`
--

CREATE TABLE `customer_management` (
  `Customer_ID` bigint(20) UNSIGNED NOT NULL,
  `Customer_name` varchar(255) NOT NULL,
  `Furigana` varchar(255) NOT NULL,
  `Telephone_number` bigint(20) NOT NULL,
  `Email_address` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Company_name` varchar(255) NOT NULL,
  `Post` varchar(255) NOT NULL,
  `First_meeting_date` date DEFAULT NULL,
  `Last_contact_date` date DEFAULT NULL,
  `Next_contact_date` date DEFAULT NULL,
  `Date_of_birth` date DEFAULT NULL,
  `Preferred_language` varchar(255) NOT NULL,
  `Preferred_Contact_method` varchar(255) NOT NULL,
  `Support` varchar(255) NOT NULL,
  `Supporting_details` varchar(255) NOT NULL,
  `Satisfaction` int(11) NOT NULL,
  `Encounter` varchar(255) NOT NULL,
  `I_learnt` varchar(255) NOT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_management`
--

INSERT INTO `customer_management` (`Customer_ID`, `Customer_name`, `Furigana`, `Telephone_number`, `Email_address`, `Address`, `Company_name`, `Post`, `First_meeting_date`, `Last_contact_date`, `Next_contact_date`, `Date_of_birth`, `Preferred_language`, `Preferred_Contact_method`, `Support`, `Supporting_details`, `Satisfaction`, `Encounter`, `I_learnt`, `Note`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'ジョン・ドウ', 1234567890, 'john.doe@example.com', '123 Main Street, Tokyo, Japan', 'Doe Corp', 'CEO', '2023-01-15', '2023-06-20', '2023-07-25', '1985-09-12', 'English', 'Email', 'Technical', 'Requires advanced support for CRM.', 5, 'Networking event', 'Interested in cloud solutions.', 'Follow-up for proposal next month.', '2024-09-28 15:43:59', '2024-09-28 15:43:59');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `Department_ID` bigint(20) UNSIGNED NOT NULL,
  `Department_Name` varchar(255) NOT NULL,
  `Department_Description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`Department_ID`, `Department_Name`, `Department_Description`, `created_at`, `updated_at`) VALUES
(1, 'Human Resources', 'Handles recruitment and employee management.', '2024-09-28 15:50:02', '2024-09-28 15:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `Employee_ID` bigint(20) UNSIGNED NOT NULL,
  `Department_ID` bigint(20) UNSIGNED NOT NULL,
  `Employee_Name` varchar(255) NOT NULL,
  `Furigana` varchar(255) NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `Nationality` varchar(100) NOT NULL,
  `Date_Of_Birth` date NOT NULL,
  `Telephone_Number` bigint(20) NOT NULL,
  `Email_Address` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Deploy` varchar(100) NOT NULL,
  `Employment_Status` varchar(50) NOT NULL,
  `Post` varchar(100) NOT NULL,
  `Hiring_Date` date NOT NULL,
  `Payroll_Interval` varchar(50) NOT NULL,
  `Payday` varchar(50) NOT NULL,
  `Salary` int(11) NOT NULL,
  `Deduction_rate` double(8,2) NOT NULL,
  `Total_Deduction_Amount` int(11) NOT NULL,
  `Health_Insurance_Number` bigint(20) NOT NULL,
  `Employee_Pension_Insurance_Number` bigint(20) NOT NULL,
  `Employment_Insurance_Number` bigint(20) NOT NULL,
  `Working_Days_Count` int(11) NOT NULL,
  `Absent_Days_Count` int(11) NOT NULL,
  `Absence_History` varchar(255) DEFAULT NULL,
  `Performance_Evaluation` int(11) NOT NULL,
  `Last_Meeting_Date` date DEFAULT NULL,
  `Other_Notes` varchar(255) DEFAULT NULL,
  `Employment_Contract` text DEFAULT NULL,
  `Personal_Information` text DEFAULT NULL,
  `Resume` text DEFAULT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Authority` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`Employee_ID`, `Department_ID`, `Employee_Name`, `Furigana`, `Gender`, `Nationality`, `Date_Of_Birth`, `Telephone_Number`, `Email_Address`, `Address`, `Deploy`, `Employment_Status`, `Post`, `Hiring_Date`, `Payroll_Interval`, `Payday`, `Salary`, `Deduction_rate`, `Total_Deduction_Amount`, `Health_Insurance_Number`, `Employee_Pension_Insurance_Number`, `Employment_Insurance_Number`, `Working_Days_Count`, `Absent_Days_Count`, `Absence_History`, `Performance_Evaluation`, `Last_Meeting_Date`, `Other_Notes`, `Employment_Contract`, `Personal_Information`, `Resume`, `Username`, `Password`, `Authority`, `created_at`, `updated_at`) VALUES
(1, 1, 'John Doe', 'ジョン・ドウ', 'Male', 'American', '1990-05-15', 1234567890, 'john.doe@example.com', '123 Main Street, Tokyo, Japan', 'IT Department', 'Full-time', 'Software Engineer', '2023-01-01', 'Monthly', '25th', 5000, 0.20, 1000, 123456789, 987654321, 456789123, 22, 0, NULL, 5, '2023-06-15', 'No issues.', 'Signed', 'Confidential', 'Submitted', 'johndoe', 'password123', 'Employee', '2024-09-28 16:02:12', '2024-09-28 16:02:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2024_09_18_030700_create_otps_table', 1),
(3, '2024_09_18_202338_create_admin_info_table', 1),
(4, '2024_09_28_203951_create_customer_management_table', 2),
(5, '2024_09_28_204705_create_departments_table', 3),
(6, '2024_09_28_205846_create_employees_table', 4),
(7, '2024_09_28_210739_create_timesheets_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `timesheets`
--

CREATE TABLE `timesheets` (
  `TimeSheet_ID` bigint(20) UNSIGNED NOT NULL,
  `Employee_ID` bigint(20) UNSIGNED NOT NULL,
  `Todays_Work` date NOT NULL,
  `Today_Departure` date DEFAULT NULL,
  `Break_Time_in_Hours` int(11) NOT NULL,
  `Number_of_Working_Days` int(11) NOT NULL,
  `Number_of_Days_Absent` int(11) DEFAULT NULL,
  `Reason_for_Absence` varchar(255) DEFAULT NULL,
  `Scheduling` varchar(255) NOT NULL,
  `Week` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timesheets`
--

INSERT INTO `timesheets` (`TimeSheet_ID`, `Employee_ID`, `Todays_Work`, `Today_Departure`, `Break_Time_in_Hours`, `Number_of_Working_Days`, `Number_of_Days_Absent`, `Reason_for_Absence`, `Scheduling`, `Week`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-09-28', '2023-09-28', 1, 5, 0, NULL, 'Morning Shift', '2023-09-25', '2024-09-28 16:10:09', '2024-09-28 16:10:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_info_email_unique` (`email`),
  ADD UNIQUE KEY `admin_info_bussiness_id_unique` (`Bussiness_ID`);

--
-- Indexes for table `customer_management`
--
ALTER TABLE `customer_management`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`Department_ID`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`Employee_ID`),
  ADD KEY `employees_department_id_foreign` (`Department_ID`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD PRIMARY KEY (`TimeSheet_ID`),
  ADD KEY `timesheets_employee_id_foreign` (`Employee_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_management`
--
ALTER TABLE `customer_management`
  MODIFY `Customer_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `Department_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `Employee_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `timesheets`
--
ALTER TABLE `timesheets`
  MODIFY `TimeSheet_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_department_id_foreign` FOREIGN KEY (`Department_ID`) REFERENCES `departments` (`Department_ID`) ON DELETE CASCADE;

--
-- Constraints for table `timesheets`
--
ALTER TABLE `timesheets`
  ADD CONSTRAINT `timesheets_employee_id_foreign` FOREIGN KEY (`Employee_ID`) REFERENCES `employees` (`Employee_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
