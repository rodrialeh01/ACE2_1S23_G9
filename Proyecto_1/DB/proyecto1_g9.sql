-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2023 a las 07:05:40
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
-- Base de datos: `proyecto1_g9`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tiempo_trabajo` int(11) NOT NULL,
  `tiempo_descanso` int(11) NOT NULL,
  `tiempo_sistema` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id_usuario`, `nombre`, `tiempo_trabajo`, `tiempo_descanso`, `tiempo_sistema`) VALUES
(1, 'Daniel', 25, 5, '2023-03-22 05:20:23'),
(2, 'Reginaldo', 25, 5, '2023-03-22 05:20:39'),
(3, 'Dubon', 25, 5, '2023-03-22 05:20:54'),
(4, 'Rodriguez', 25, 5, '2023-03-22 05:21:06'),
(5, 'Prueba', 25, 5, '2023-03-22 05:21:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tiempo` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL,
  `id_pomodoro` int(11) NOT NULL,
  `fase_pomodoro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`id`, `id_usuario`, `tiempo`, `estado`, `id_pomodoro`, `fase_pomodoro`) VALUES
(1, 5, '2023-03-23 04:40:29', 1, 1, 1),
(2, 5, '2023-03-23 04:40:29', 1, 1, 1),
(3, 5, '2023-03-23 04:40:29', 1, 1, 1),
(4, 5, '2023-03-23 04:40:29', 1, 1, 1),
(5, 5, '2023-03-23 04:40:29', 1, 1, 1),
(6, 5, '2023-03-23 04:40:29', 1, 1, 1),
(7, 5, '2023-03-23 04:40:29', 1, 1, 1),
(8, 5, '2023-03-23 04:40:29', 1, 1, 1),
(9, 5, '2023-03-23 04:40:29', 1, 1, 1),
(10, 5, '2023-03-23 04:40:29', 1, 1, 1),
(11, 5, '2023-03-23 04:40:29', 1, 1, 1),
(12, 5, '2023-03-23 04:40:29', 1, 1, 1),
(13, 5, '2023-03-23 05:10:36', 1, 1, 2),
(14, 5, '2023-03-23 05:10:46', 1, 1, 2),
(15, 5, '2023-03-23 05:10:54', 1, 1, 2),
(16, 5, '2023-03-23 05:11:01', 1, 1, 2),
(17, 5, '2023-03-23 05:11:07', 1, 1, 2),
(18, 5, '2023-03-23 05:11:13', 1, 1, 2),
(19, 1, '2023-03-23 05:11:51', 1, 1, 2),
(20, 1, '2023-03-23 05:20:03', 0, 1, 2),
(21, 1, '2023-03-23 05:20:09', 0, 1, 2),
(22, 1, '2023-03-23 05:20:15', 0, 1, 2),
(23, 1, '2023-03-23 05:20:30', 0, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `configurar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id`, `estado`, `configurar`) VALUES
(1, 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `datos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `configuracion` (`id_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
