----Cambiarse a base postgres
\c postgres;

-- Create a new database called 'cursos'
CREATE DATABASE cursos;

--Conexión base library
\c cursos;

--Encoding UTF8
SET client_encoding TO 'UTF8';

--Crear Tablas
CREATE TABLE cursos(
  id SERIAL,
  nombre VARCHAR(50),
  nivel INT,
  fecha DATE,
  duracion INT,
  PRIMARY KEY (id)
);