-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-07-2025 a las 19:16:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `odonto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointment`
--

CREATE TABLE `appointment` (
  `id` int(10) UNSIGNED NOT NULL,
  `patient_id` int(10) UNSIGNED NOT NULL,
  `dentist_id` int(10) UNSIGNED NOT NULL,
  `treatment_id` int(10) UNSIGNED DEFAULT NULL,
  `appointment_datetime` datetime NOT NULL,
  `status` enum('scheduled','completed','cancelled') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `appointment`
--

INSERT INTO `appointment` (`id`, `patient_id`, `dentist_id`, `treatment_id`, `appointment_datetime`, `status`) VALUES
(1, 1, 2, 1, '2025-07-10 15:00:00', 'scheduled'),
(2, 1, 2, 4, '2025-07-10 10:00:00', 'scheduled'),
(3, 4, 2, 4, '2025-07-15 09:30:00', 'completed');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dentist`
--

CREATE TABLE `dentist` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dentist`
--

INSERT INTO `dentist` (`id`, `user_id`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventory`
--

CREATE TABLE `inventory` (
  `id` int(10) UNSIGNED NOT NULL,
  `material_name` varchar(255) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `actual_stock` int(11) NOT NULL DEFAULT 0,
  `min_stock` int(11) NOT NULL DEFAULT 0,
  `proveedor` varchar(150) NOT NULL,
  `costo_unitario` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patient`
--

CREATE TABLE `patient` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `birth_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patient`
--

INSERT INTO `patient` (`id`, `full_name`, `dni`, `phone`, `address`, `birth_date`) VALUES
(1, 'Ana López', '12345678', '987654321', 'Av. Siempre Viva 123', '1990-06-15'),
(2, 'Carlos Méndez', '87654321', '912345678', 'Jr. Las Flores 456', '1985-09-20'),
(3, 'Lucía Ramírez', '11223344', '955667788', 'Calle Lima 789', '1992-12-01'),
(4, 'Pedro Castillo', '55667788', '900123456', 'Av. Arequipa 101', '1978-03-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `id` int(10) UNSIGNED NOT NULL,
  `appointment_id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `treatment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `payment`
--

INSERT INTO `payment` (`id`, `appointment_id`, `amount`, `payment_date`, `treatment_id`) VALUES
(1, 3, 80.00, '2025-07-13', 1),
(2, 1, 100.00, '2025-07-13', 1),
(3, 2, 120.00, '2025-07-13', 1),
(5, 2, 1800.00, '2025-07-13', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `treatment`
--

CREATE TABLE `treatment` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `treatment`
--

INSERT INTO `treatment` (`id`, `name`, `description`, `cost`) VALUES
(1, 'Limpieza dental', 'Eliminación de placa bacteriana y sarro.', 80.00),
(2, 'dental', 'Eliminación de placa bacteriana y sarro.', 90.00),
(4, 'Blanqueamiento', 'Tratamiento de estética dental.', 150.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password_hash` text NOT NULL,
  `role` enum('admin','receptionist','dentist') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `full_name`, `password_hash`, `role`, `created_at`) VALUES
(1, 'rene@gmail.com', 'rene rolando', '$2y$12$zFzES8AvclG3dS6HXzWh7e0jutl.RTe08D07HYKmZbNBiOsTYjzzi', 'dentist', '2025-05-31 01:47:36');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `dentist_id` (`dentist_id`),
  ADD KEY `treatment_id` (`treatment_id`);

--
-- Indices de la tabla `dentist`
--
ALTER TABLE `dentist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indices de la tabla `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `dentist`
--
ALTER TABLE `dentist`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `treatment`
--
ALTER TABLE `treatment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`dentist_id`) REFERENCES `dentist` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `dentist`
--
ALTER TABLE `dentist`
  ADD CONSTRAINT `dentist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
