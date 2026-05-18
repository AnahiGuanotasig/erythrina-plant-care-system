 CREATE TABLE roles (
	id SERIAL PRIMARY KEY,
	rol VARCHAR(50) NOT NULL
 );

 CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	correo_electronico VARCHAR(100) NOT NULL UNIQUE,
	nombre_usuario VARCHAR(60) NOT NULL,
	password_hash VARCHAR NOT NULL,
	id_rol INTEGER NOT NULL REFERENCES roles(id) 
);

 
CREATE TABLE plantas_tipos (
	id SERIAL PRIMARY KEY,
	tipo VARCHAR(50) NOT NULL
);
CREATE TABLE plantas_tamanios (
	id SERIAL PRIMARY KEY,
	tamanio VARCHAR(50) NOT NULL
);
CREATE TABLE estados (
	id SERIAL PRIMARY KEY,
	estado VARCHAR(50) NOT NULL
);
CREATE TABLE plantas (
	id SERIAL PRIMARY KEY,
	codigo varchar(20) NOT NULL UNIQUE,
	nombre varchar(60) NOT NULL,
	id_tipo INT NOT NULL REFERENCES plantas_tipos(id),
	id_tamanio INT NOT NULL REFERENCES plantas_tamanios(id),
	id_estado INT NOT NULL REFERENCES estados(id),
	fecha_plantacion date NULL,
	intervalo_riego_dias INT NOT NULL,
	id_usuario INT NOT NULL REFERENCES usuarios(id)
);
CREATE Table historial_plantas (
  id serial PRIMARY KEY,
  id_planta int NOT NULL REFERENCES plantas(id),
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_estado int NOT NULL,
  id_tamanio int NOT NULL,
  intervalo_riego_dias int,
  observaciones text
);