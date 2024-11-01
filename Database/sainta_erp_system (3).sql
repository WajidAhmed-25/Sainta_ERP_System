-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2024 at 07:13 AM
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
-- Database: `sainta_erp_system`
--

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
  `Bussiness_ID` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `business_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`id`, `name`, `email`, `contact`, `password`, `selectedService`, `period`, `contactEmail`, `Bussiness_ID`, `created_at`, `updated_at`, `business_id`) VALUES
(2, 'Wajid Ahmed', 'ahsanzafar300@gmail.com', '0434234312', '7520c3a63aef2728b7ce90cd400d1057a8e5dcec37ab52f722ba614e9d3662e8', 'Lab', 'Yearly Contract', 'wajidsaleem693@gmail.com', NULL, '2024-10-21 12:49:45', '2024-10-21 12:49:45', 425573),
(3, 'Wajid', 'wajidsaleem693@gmail.com', '23231', '7520c3a63aef2728b7ce90cd400d1057a8e5dcec37ab52f722ba614e9d3662e8', 'Business', 'Weekly Contract', 'wajidsaleem693@gmail.com', NULL, '2024-10-30 15:55:28', '2024-10-30 15:55:28', 193716);

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
(9, 'Wajids', 'ジョン・ドウ', 3103506305, 'wajidsaleem693@gmail.com', 'House # L 307/1 Bufferzone, Karachi', 'Devcir Co', 'Full Stack Developer', '2024-10-28', '2024-10-25', '2024-10-23', '2024-10-22', 'English', 'Email', 'Wajid Ahmed', 'Starters', 7, 'Wajid', 'Mathematics', 'Waiting for Notes', '2024-10-31 12:52:37', '2024-10-31 15:04:46');

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
(18, 'SQA Department', 'Here we test the Systems', '2024-10-02 16:05:50', '2024-10-31 15:05:03'),
(22, 'Marketings', 'This is Marketing', '2024-10-09 14:40:55', '2024-10-09 14:41:02'),
(23, 'Software Development', 'Where Ideas meet technology', '2024-10-16 15:03:44', '2024-10-16 15:03:44'),
(24, 'HR Departments', 'This is HR resource Planning', '2024-10-16 15:04:13', '2024-10-16 16:30:05');

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
(19, 18, 'Wajid Arain', 'ジョン・ドウ', 'Male', 'American', '2024-10-23', 3103506305, 'wajidahmed907@gmail.com', 'House # L 307/1 Bufferzone, Karachi', '20', 'Full-Time Contract', 'Full Stack Developer', '2024-10-22', 'Weekly', 'Wednesday', 54000, 12.00, 6480, 423423423423, 3242342342332, 3423423432434, 42, 12, 'Medical Leave', 4, '2024-10-25', 'This is a Note', 'employees/WajidAhmed/employment_contract/BJryovlINOsKXIIs58YDpIrsLIbrgeRA2xHE4QQb.jpg', 'employees/WajidAhmed/personal_information/I7XcU3oBaDhwY3C1eg1d8Rh50apy3TsmcrmpBqnu.jpg', 'employees/WajidAhmed/resume/L6ERLh57rWnSwUbSfsiwJNuOFaoufyyEJubjgkli.pdf', 'WajidAhmed', 'WAJID12345', 'Administrator', '2024-10-16 14:33:09', '2024-10-31 15:06:43'),
(20, 23, 'Bilal Hashmi', 'ジョン・ドウ', 'Female', 'American', '2024-10-19', 3103506303, 'wajidahmed907@gmail.com', 'House # L 307/1 Bufferzone, Karachi', '0', 'Part-Time Contract', 'Full Stack Developer', '2024-10-25', 'Weekly', 'Wednesday', 54000, 20.00, 6480, 34324234324234, 3424234234234, 893243983298, 42, 12, 'Medical leave', 4, '2024-10-30', 'This is me', 'employees/BilalHashmi/employment_contract/Noj2fNJkTM8oQDTIxKLcxk1T9b0lA0SidpIauGJd.jpg', 'employees/BilalHashmi/personal_information/xzxaX2y2SX6T9KgwHRYj1pGThpM3rb8MWkaoUtBr.jpg', 'employees/BilalHashmi/resume/VZ3UV4g265GkgjTu1W3bVI8Vsl6eVOH0nWUfCEca.jpg', 'BilalHashmi', 'BILAL12345', 'User', '2024-10-16 14:34:39', '2024-10-30 15:22:03'),
(21, 23, 'John Doe', 'ジョン・ドウ', 'Male', 'American', '2024-10-18', 3103506305, 'wajidahmed907@gmail.com', 'House # L 307/1 Bufferzone, Karachi', '0', 'Part-Time Contract', 'Full Stack Developer', '2024-10-18', 'Weekly', 'Wednesday', 56000, 13.00, 6720, 343242342344442, 454543535345345, 3253453453534543, 64, 23, 'Sick Leave', 3, '2024-10-25', 'This is me', 'employees/JohnDoe/employment_contract/XbRgad40CWBWTptMvBpt1DXutfRb231nQeWioUgD.jpg', 'employees/JohnDoe/personal_information/vNbYRElkUUjGTUTHIXvmmP5Rs7IGC1AXYzfnmV69.jpg', 'employees/JohnDoe/resume/pN710pD9EFHaZsKyR8qOJofujx1x5jXqTOFmjTN8.jpg', 'JohnDoe', 'JOH12345', 'User', '2024-10-16 15:05:54', '2024-10-16 16:24:01'),
(22, 24, 'Marium Azhars', 'ジョン・ドウ', 'Female', 'American', '2024-10-19', 3103506305, 'wajidahmed907@gmail.com', 'House # L 307/1 Bufferzone, Karachi', '0', 'Full-Time Contract', 'Full Stack Developer', '2024-10-18', 'Weekly', 'Tuesday', 54000, 24.00, 12960, 545345345345, 3253254534, 4334534544, 39, 12, 'Medical', 7, '2024-10-19', 'Nioyre', 'employees/MariumAzhar/employment_contract/SlgQ2SWnxgvNHMCU43cPyHKFj9NoINwPTesse1pI.jpg', 'employees/MariumAzhar/personal_information/gXtcFyg1ZLpyR6wHiRiGk87nardxEWffClqaQnXW.jpg', 'employees/MariumAzhar/resume/zmE6J3kVyHvI3LaLNMNCixj6lU7JrcMFWjJHjGqb.txt', 'MariumAzhar', 'Marium12345', 'Moderator', '2024-10-16 15:10:27', '2024-10-16 15:11:00'),
(23, 18, 'John Does', 'ジョン・ドウ', 'Male', 'American', '2024-11-20', 3103506305, 'wajidahmed907@gmail.coms', 'House # L 307/1 Bufferzone, Karachi', '0', 'Full-Time Contract', 'Full Stack Developer', '2024-11-11', 'Weekly', 'Friday', 775242, 1.00, 7752, 432423423424, 5345435345435, 543534534543543, 32, 13, 'Medical', 4, '2024-11-11', 'Hi', 'employees/JohnDoe/employment_contract/7xUQIlA59HPdy1rQg6Uvzb7VDO7O7pqoNnLOqqMf.txt', 'employees/JohnDoe/personal_information/0r0y7nNou1RctPglvrwHIUOM8jI867sZ3MnATdO6.txt', 'employees/JohnDoe/resume/YCMpog51Bxy1vBsSgfQmo8Rpt5CfM6rAorM7YWCD.pdf', 'JohnDoe', 'JOHN12345', 'Administrator', '2024-10-31 15:08:43', '2024-10-31 15:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `employees_daily_attendance`
--

CREATE TABLE `employees_daily_attendance` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` bigint(20) UNSIGNED NOT NULL,
  `todays_joining_time` time NOT NULL,
  `todays_departure_time` time NOT NULL,
  `break_time_in_hours` double(8,2) NOT NULL,
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees_daily_attendance`
--

INSERT INTO `employees_daily_attendance` (`id`, `employee_id`, `todays_joining_time`, `todays_departure_time`, `break_time_in_hours`, `date`, `created_at`, `updated_at`) VALUES
(9, 19, '04:18:00', '05:19:00', 2.00, '2024-10-16', '2024-10-16 16:16:19', '2024-10-16 16:16:19'),
(10, 20, '16:19:00', '05:22:00', 1.00, '2024-10-16', '2024-10-16 16:17:40', '2024-10-16 16:17:40'),
(11, 21, '17:20:00', '20:22:00', 1.00, '2024-10-18', '2024-10-16 16:18:04', '2024-10-16 16:18:04'),
(12, 21, '05:21:00', '05:22:00', 1.00, '2024-10-18', '2024-10-16 16:18:25', '2024-10-16 16:18:25'),
(13, 21, '16:34:00', '18:36:00', 0.00, '2024-10-17', '2024-10-16 16:32:26', '2024-10-16 16:32:26'),
(14, 20, '16:58:00', '19:00:00', 1.00, '2024-10-16', '2024-10-16 16:55:36', '2024-10-16 16:55:36'),
(15, 19, '12:11:00', '15:14:00', 1.00, '2024-10-22', '2024-10-17 13:09:59', '2024-10-17 13:09:59'),
(16, 22, '23:28:00', '14:30:00', 1.00, '2024-10-18', '2024-10-17 13:29:05', '2024-10-17 13:29:05'),
(17, 20, '15:13:00', '03:12:00', 1.00, '2024-10-31', '2024-10-31 15:09:54', '2024-10-31 15:09:54');

-- --------------------------------------------------------

--
-- Table structure for table `employees_timesheet`
--

CREATE TABLE `employees_timesheet` (
  `TimeSheet_ID` bigint(20) UNSIGNED NOT NULL,
  `Employee_ID` bigint(20) UNSIGNED NOT NULL,
  `Number_of_Working_Days` int(11) NOT NULL,
  `Number_of_Days_Absent` int(11) DEFAULT NULL,
  `Reason_for_Absence` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `Week` date NOT NULL DEFAULT current_timestamp(),
  `timesheets_created` date DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees_timesheet`
--

INSERT INTO `employees_timesheet` (`TimeSheet_ID`, `Employee_ID`, `Number_of_Working_Days`, `Number_of_Days_Absent`, `Reason_for_Absence`, `start_time`, `end_time`, `Week`, `timesheets_created`, `created_at`, `updated_at`) VALUES
(16, 19, 64, 11, 'Accident', NULL, NULL, '2024-10-16', '2024-10-17', '2024-10-16 16:31:47', '2024-10-31 15:10:17'),
(17, 20, 54, 12, 'Medical Leave', NULL, NULL, '2024-10-16', '2024-10-17', '2024-10-16 16:55:18', '2024-10-17 12:35:36'),
(19, 22, 23, 4, 'no', NULL, NULL, '2024-10-17', '2024-10-17', '2024-10-17 13:28:36', '2024-10-17 13:28:36'),
(20, 23, 42, 12, 'Medical', NULL, NULL, '2024-10-31', '2024-11-01', '2024-10-31 15:10:32', '2024-10-31 15:10:32');

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
(7, '2024_09_28_210739_create_timesheets_table', 5),
(8, '2024_09_28_220117_add_business_id_to_admin_info_table', 6),
(9, '2024_10_10_182323_create_employees_timesheet_table', 7),
(10, '2024_10_10_190031_add_timesheets_created_to_employees_timesheets_table', 8),
(11, '2024_10_10_202819_add_start_time_end_time_to_employees_timesheets_table', 9),
(12, '2024_10_10_220922_create_employees_daily_attendance_table', 10),
(13, '2024_10_10_223820_add_date_to_employees_daily_attendance_table', 11);

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

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `email`, `otp`, `created_at`, `updated_at`) VALUES
(4, 'wajidsaleem693@gmail.com', '883234', '2024-09-28 17:07:28', '2024-09-28 17:07:28'),
(5, 'ahsanzafar300@gmail.com', '754860', '2024-10-21 12:48:14', '2024-10-21 12:48:14'),
(6, 'wajidsaleem693@gmail.com', '389886', '2024-10-30 15:18:59', '2024-10-30 15:18:59'),
(7, 'wajidsaleem693@gmail.com', '735093', '2024-10-30 15:46:47', '2024-10-30 15:46:47'),
(8, 'wajidsaleem693@gmail.com', '351042', '2024-10-30 15:53:58', '2024-10-30 15:53:58');

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_info_email_unique` (`email`),
  ADD UNIQUE KEY `admin_info_bussiness_id_unique` (`Bussiness_ID`),
  ADD UNIQUE KEY `admin_info_business_id_unique` (`business_id`);

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
-- Indexes for table `employees_daily_attendance`
--
ALTER TABLE `employees_daily_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_daily_attendance_employee_id_foreign` (`employee_id`);

--
-- Indexes for table `employees_timesheet`
--
ALTER TABLE `employees_timesheet`
  ADD PRIMARY KEY (`TimeSheet_ID`),
  ADD KEY `employees_timesheet_employee_id_foreign` (`Employee_ID`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_management`
--
ALTER TABLE `customer_management`
  MODIFY `Customer_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `Department_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `Employee_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `employees_daily_attendance`
--
ALTER TABLE `employees_daily_attendance`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `employees_timesheet`
--
ALTER TABLE `employees_timesheet`
  MODIFY `TimeSheet_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_department_id_foreign` FOREIGN KEY (`Department_ID`) REFERENCES `departments` (`Department_ID`) ON DELETE CASCADE;

--
-- Constraints for table `employees_daily_attendance`
--
ALTER TABLE `employees_daily_attendance`
  ADD CONSTRAINT `employees_daily_attendance_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`Employee_ID`) ON DELETE CASCADE;

--
-- Constraints for table `employees_timesheet`
--
ALTER TABLE `employees_timesheet`
  ADD CONSTRAINT `employees_timesheet_employee_id_foreign` FOREIGN KEY (`Employee_ID`) REFERENCES `employees` (`Employee_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
