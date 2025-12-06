CREATE DATABASE IF NOT EXISTS mi_app;
USE mi_app;

-- eliminar esto:
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

-- agregar esto
CREATE TABLE maquinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50),
    imagen VARCHAR(255)  
);

-- apretar el rayito
-- primero no aparece la tabla, hay que cerrar y abrir el workbench y ahi aparece