-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 12, 2021 at 11:57 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SitoNadia`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `sale` varchar(25) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `sale`, `created_at`, `updated_at`) VALUES
(1, 'nadiaorlando97@gmail.com', 'e36000d449c8fbd73966b0ce7d9f86a5', '9652b811bacf6c6cf24f', '2021-07-09 15:43:09', '2021-07-09 15:43:09'),
(4, 'nadia@libero.it', '574124c85909d48fd9ee24da8b544121', '626fe61eb00d64b0c019', '2021-07-09 15:43:09', '2021-07-09 15:43:09'),
(8, 'd1@email.com', '$2y$10$Az4prT6kb8/qMLqkwfCXAel.mvpK2OKUvTc0wQtgfLxakpBoIZdBa', NULL, '2021-07-12 07:06:44', '2021-07-12 07:06:44');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `codProdotto` int(11) NOT NULL,
  `utente` varchar(256) NOT NULL,
  `nomeProdotto` varchar(256) NOT NULL,
  `Descrizione` varchar(256) NOT NULL,
  `Prezzo` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `RefCodProdotto` int(8) NOT NULL,
  `RefCodUtente` int(8) NOT NULL,
  `id` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(8) NOT NULL,
  `NomeProdotto` varchar(256) COLLATE armscii8_bin NOT NULL,
  `Descrizione` varchar(256) COLLATE armscii8_bin NOT NULL,
  `Prezzo` float NOT NULL,
  `PercorsoImg` varchar(256) COLLATE armscii8_bin NOT NULL,
  `PrezzoScontato` float NOT NULL,
  `Sconto` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `NomeProdotto`, `Descrizione`, `Prezzo`, `PercorsoImg`, `PrezzoScontato`, `Sconto`, `created_at`, `updated_at`) VALUES
(1, 'Jacquemus', 'Borsa media in pelle bianca', 525, './css/jaquemus.jpg', 262.5, 50, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(2, 'Gucci', 'Borsa GG con catena', 1500, './css/gucci1.jpg', 750, 50, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(3, 'Louis Vuitton', 'Borsetta piccola con logo', 1400, './css/LV8.jpg', 700, 50, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(4, 'Chanel', 'Borsa piccola con tracolla', 2000, './css/chanel.jpg', 1000, 50, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(5, 'Michael Kors', 'Zaino con doppie cerniere', 350, './css/zaino.jpg', 245, 30, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(6, 'Moschino', 'Borsa grande LOVE a spalla', 180, './css/moschino.jpg', 162, 10, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(7, 'Pinko', 'Mini Love Bag Icon Simply', 250, './css/pinko.jpg', 225, 10, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(8, 'Dior', 'Borsa nera Saddle in pelle', 400, './css/dior.jpg', 280, 30, '2021-07-11 09:03:47', '2021-07-11 09:03:47'),
(9, 'Prada', 'Mini Borsa in nylon rossa', 500, './css/prada.jpg', 250, 50, '2021-07-11 09:03:47', '2021-07-11 09:03:47');

-- --------------------------------------------------------

--
-- Table structure for table `purchased_items`
--

CREATE TABLE `purchased_items` (
  `CodProdotto` int(11) NOT NULL,
  `acquisto` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `TestoRecensione` varchar(256) NOT NULL,
  `CodProdotto` int(11) NOT NULL,
  `CodUtente` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `TestoRecensione`, `CodProdotto`, `CodUtente`, `created_at`, `updated_at`) VALUES
(4, 'Adoro questa borsetta', 4, 2, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(6, 'Troppo carina questa borsa', 6, 2, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(7, 'Meravigliosa', 7, 4, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(10, 'La adoro', 8, 2, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(11, 'Soddisfatta dell\'acquisto', 9, 2, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(14, 'Bellissima', 1, 2, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(23, 'Molto capiente!', 5, 7, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(24, 'Ottima qualità', 2, 7, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(25, 'Mi piace tantissimo', 3, 7, '2021-07-11 09:09:46', '2021-07-11 09:09:46'),
(28, 'Non mi piace', 2, 21, '2021-07-11 09:53:04', '2021-07-11 09:53:04'),
(29, 'Bello', 2, 21, '2021-07-11 09:55:42', '2021-07-11 09:55:42'),
(30, 'Bellissima', 1, 21, '2021-07-11 09:55:54', '2021-07-11 09:55:54');

-- --------------------------------------------------------

--
-- Table structure for table `shipment_in_progress`
--

CREATE TABLE `shipment_in_progress` (
  `dataInvio` date NOT NULL,
  `acquisto` int(11) NOT NULL,
  `utente` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipment_in_progress`
--

INSERT INTO `shipment_in_progress` (`dataInvio`, `acquisto`, `utente`, `id`, `created_at`, `updated_at`) VALUES
('2020-05-01', 3, 2, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29'),
('2020-04-03', 4, 2, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29'),
('2021-01-20', 6, 7, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29'),
('2021-02-01', 7, 7, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29'),
('2021-01-20', 9, 22, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29'),
('2021-02-01', 10, 22, 0, '2021-07-11 09:22:29', '2021-07-11 09:22:29');

-- --------------------------------------------------------

--
-- Table structure for table `shipment_occurrents`
--

CREATE TABLE `shipment_occurrents` (
  `dataInvio` date NOT NULL,
  `acquisto` int(11) NOT NULL,
  `utente` int(11) NOT NULL,
  `costo` float NOT NULL,
  `dataConsegna` date NOT NULL,
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipment_occurrents`
--

INSERT INTO `shipment_occurrents` (`dataInvio`, `acquisto`, `utente`, `costo`, `dataConsegna`, `id`, `created_at`, `updated_at`) VALUES
('2020-04-03', 4, 2, 150, '2020-04-10', 0, '2021-07-11 09:20:22', '2021-07-11 09:20:22'),
('2020-02-05', 8, 7, 120, '2020-02-10', 0, '2021-07-11 09:20:22', '2021-07-11 09:20:22'),
('2020-02-05', 11, 22, 120, '2020-02-10', 0, '2021-07-11 09:20:22', '2021-07-11 09:20:22');

-- --------------------------------------------------------

--
-- Table structure for table `shoppings`
--

CREATE TABLE `shoppings` (
  `id` int(11) NOT NULL,
  `conBuono` tinyint(1) NOT NULL,
  `importo` int(11) NOT NULL,
  `utente` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shoppings`
--

INSERT INTO `shoppings` (`id`, `conBuono`, `importo`, `utente`, `created_at`, `updated_at`) VALUES
(3, 0, 500, 2, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(4, 0, 1000, 2, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(5, 1, 300, 2, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(6, 0, 450, 7, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(7, 0, 600, 7, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(8, 1, 700, 7, '2021-07-11 09:08:01', '2021-07-11 09:08:01'),
(9, 0, 450, 22, '2021-07-12 08:07:41', '2021-07-12 08:07:41'),
(10, 0, 600, 22, '2021-07-12 08:07:41', '2021-07-12 08:07:41'),
(11, 1, 700, 22, '2021-07-12 08:07:41', '2021-07-12 08:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `sale` varchar(256) DEFAULT NULL,
  `spesaTotSpedizioni` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `sale`, `spesaTotSpedizioni`, `created_at`, `updated_at`) VALUES
(2, 'nadiaorlando97@gmail.com', '2694834590e19fd711925f50f17f4446', 'e1da813e83efe42eea44', 150, '2021-07-09 15:39:02', '2021-07-09 15:39:02'),
(3, 'pippo@hotmail.com', '2147395256c6ab834126e5400e79de6f', '2d83ce421eee424141be', 0, '2021-07-09 15:39:02', '2021-07-09 15:39:02'),
(6, 'mariello@hotmail.com', 'ee4e7b493013cc19e73a453c90fd50ee', 'f4bece3d5dcf91360552', 0, '2021-07-09 15:39:02', '2021-07-09 15:39:02'),
(7, 'maria@hotmail.com', '92560afe60581204aefb2a669094acf8', '536c2f0e8bb7a71d5919', 120, '2021-07-09 15:39:02', '2021-07-09 15:39:02'),
(21, 'd@email.it', '123', '0', 20, '2021-07-11 11:35:15', '2021-07-11 11:35:15'),
(22, 'm1@email.com', '$2y$10$fIP3pvHI3DLNuph5tshHIO7l62hYNa2nkpWX9Wt88SjgIsJf5r8ZS', NULL, NULL, '2021-07-11 16:47:42', '2021-07-11 16:47:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`RefCodProdotto`,`RefCodUtente`,`id`),
  ADD KEY `RefCodUtente` (`RefCodUtente`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchased_items`
--
ALTER TABLE `purchased_items`
  ADD PRIMARY KEY (`CodProdotto`,`acquisto`,`id`),
  ADD KEY `articoliacquistati_ibfk_1` (`acquisto`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipment_in_progress`
--
ALTER TABLE `shipment_in_progress`
  ADD PRIMARY KEY (`acquisto`,`utente`,`id`),
  ADD KEY `spedizioniincorso_ibfk_1` (`utente`);

--
-- Indexes for table `shipment_occurrents`
--
ALTER TABLE `shipment_occurrents`
  ADD PRIMARY KEY (`acquisto`,`utente`,`id`),
  ADD KEY `spedizioneavvenuta_ibfk_2` (`utente`);

--
-- Indexes for table `shoppings`
--
ALTER TABLE `shoppings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acquisto_ibfk_1` (`utente`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `shoppings`
--
ALTER TABLE `shoppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`RefCodProdotto`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`RefCodUtente`) REFERENCES `users` (`id`);

--
-- Constraints for table `purchased_items`
--
ALTER TABLE `purchased_items`
  ADD CONSTRAINT `purchased_items_ibfk_1` FOREIGN KEY (`acquisto`) REFERENCES `shoppings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `purchased_items_ibfk_2` FOREIGN KEY (`CodProdotto`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipment_in_progress`
--
ALTER TABLE `shipment_in_progress`
  ADD CONSTRAINT `shipment_in_progress_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipment_in_progress_ibfk_2` FOREIGN KEY (`acquisto`) REFERENCES `shoppings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipment_occurrents`
--
ALTER TABLE `shipment_occurrents`
  ADD CONSTRAINT `shipment_occurrents_ibfk_1` FOREIGN KEY (`acquisto`) REFERENCES `shoppings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipment_occurrents_ibfk_2` FOREIGN KEY (`utente`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shoppings`
--
ALTER TABLE `shoppings`
  ADD CONSTRAINT `shoppings_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
