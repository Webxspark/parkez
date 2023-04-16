-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 03:27 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parkez`
--

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE `airports` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `address` varchar(2000) NOT NULL,
  `tag` varchar(200) NOT NULL,
  `parkingSlotsCount` varchar(200) NOT NULL,
  `status` varchar(150) NOT NULL,
  `updatedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `name`, `address`, `tag`, `parkingSlotsCount`, `status`, `updatedOn`) VALUES
(1, 'Chennai International Airport', 'Airport Rd, Meenambakkam, Chennai, Tamil Nadu 600027', 'ez_airport_7dad1b', '20', 'available', '2023-04-14 16:44:20');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `sentOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `getaccess`
--

CREATE TABLE `getaccess` (
  `id` int(11) NOT NULL,
  `email` varchar(500) NOT NULL,
  `addedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `parkingslots`
--

CREATE TABLE `parkingslots` (
  `id` int(11) NOT NULL,
  `tag` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `bookedOn` varchar(500) NOT NULL,
  `bookedTill` varchar(500) NOT NULL,
  `slot_id` varchar(150) NOT NULL,
  `airport_id` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parkingslots`
--

INSERT INTO `parkingslots` (`id`, `tag`, `status`, `bookedOn`, `bookedTill`, `slot_id`, `airport_id`) VALUES
(1, '-', 'free', '-', '-', 'ez_slot_cf7ab7', 'ez_airport_7dad1b'),
(2, '-', 'free', '-', '-', 'ez_slot_344e9d', 'ez_airport_7dad1b'),
(3, '-', 'free', '-', '-', 'ez_slot_7ead6d', 'ez_airport_7dad1b'),
(4, '-', 'free', '-', '-', 'ez_slot_fe050a', 'ez_airport_7dad1b'),
(5, '-', 'free', '-', '-', 'ez_slot_845635', 'ez_airport_7dad1b'),
(6, '-', 'free', '-', '-', 'ez_slot_f590a6', 'ez_airport_7dad1b'),
(7, '-', 'free', '-', '-', 'ez_slot_cd38a2', 'ez_airport_7dad1b'),
(8, '-', 'free', '-', '-', 'ez_slot_27e517', 'ez_airport_7dad1b'),
(9, '-', 'free', '-', '-', 'ez_slot_06d85b', 'ez_airport_7dad1b'),
(10, '-', 'free', '-', '-', 'ez_slot_c6969d', 'ez_airport_7dad1b'),
(11, '-', 'free', '-', '-', 'ez_slot_344be2', 'ez_airport_7dad1b'),
(12, '-', 'free', '-', '-', 'ez_slot_5dcfbc', 'ez_airport_7dad1b'),
(13, '-', 'free', '-', '-', 'ez_slot_03ab30', 'ez_airport_7dad1b'),
(14, '-', 'free', '-', '-', 'ez_slot_90144f', 'ez_airport_7dad1b'),
(15, '-', 'free', '-', '-', 'ez_slot_ab691e', 'ez_airport_7dad1b'),
(16, '-', 'free', '-', '-', 'ez_slot_bd85af', 'ez_airport_7dad1b'),
(17, '-', 'free', '-', '-', 'ez_slot_d834eb', 'ez_airport_7dad1b'),
(18, '-', 'free', '-', '-', 'ez_slot_8aa559', 'ez_airport_7dad1b'),
(19, '-', 'free', '-', '-', 'ez_slot_988aa3', 'ez_airport_7dad1b'),
(20, '-', 'free', '-', '-', 'ez_slot_04d819', 'ez_airport_7dad1b');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(500) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(250) NOT NULL,
  `tag` varchar(200) NOT NULL,
  `accountCreatedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `getaccess`
--
ALTER TABLE `getaccess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parkingslots`
--
ALTER TABLE `parkingslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `getaccess`
--
ALTER TABLE `getaccess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parkingslots`
--
ALTER TABLE `parkingslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
