-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2023 a las 22:27:18
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto2_g9`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control`
--

CREATE TABLE `control` (
  `id` int(11) NOT NULL,
  `est_bomba` int(11) NOT NULL,
  `tmp_conf` int(11) NOT NULL,
  `tmp_act` int(11) NOT NULL,
  `humedad` float NOT NULL,
  `pr_agua` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `control`
--

INSERT INTO `control` (`id`, `est_bomba`, `tmp_conf`, `tmp_act`, `humedad`, `pr_agua`) VALUES
(1, 0, 230, 0, 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensores`
--

CREATE TABLE `sensores` (
  `id` int(11) NOT NULL,
  `humedad` float NOT NULL,
  `tmp_int` float NOT NULL,
  `tmp_ext` float NOT NULL,
  `pr_agua` float NOT NULL,
  `est_bomba` int(11) NOT NULL,
  `tiempo` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensores`
--

INSERT INTO `sensores` (`id`, `humedad`, `tmp_int`, `tmp_ext`, `pr_agua`, `est_bomba`, `tiempo`) VALUES
(1, 10, 20, 15, 2, 1, '2023-04-22 18:27:25'),
(2, 32, 23, 23, 23, 0, '2023-04-27 02:44:27'),
(3, 23, 232, 2, 2, 1, '2023-04-27 02:44:31'),
(4, 10, 20, 15, 2, 1, '2023-04-26 01:56:39'),
(5, 3, 3, 4, 5, 0, '2023-04-27 02:58:23'),
(6, 1, 1, 1, 1, 1, '2023-04-27 03:06:12'),
(7, 10, 20, 15, 2, 1, '2023-05-04 20:22:20');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `control`
--
ALTER TABLE `control`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `control`
--
ALTER TABLE `control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sensores`
--
ALTER TABLE `sensores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
