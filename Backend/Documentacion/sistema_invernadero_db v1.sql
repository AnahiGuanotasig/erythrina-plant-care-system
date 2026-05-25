CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    nombre_usuario VARCHAR(60) NOT NULL,
    password_hash VARCHAR NOT NULL
);

CREATE TABLE plantas_tipos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL
);

CREATE TABLE plantas_tamanios (
    id SERIAL PRIMARY KEY,
    tamanio VARCHAR(50) NOT NULL,
    altura_referencia VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL
);

CREATE TABLE estados (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL
);

CREATE TABLE plantas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
	nombre VARCHAR(60) NOT NULL,
    id_tipo INT NOT NULL REFERENCES plantas_tipos(id),
    id_tamanio INT NOT NULL REFERENCES plantas_tamanios(id),
    id_estado INT NOT NULL REFERENCES estados(id),
    fecha_plantacion DATE NULL,
    intervalo_riego_dias INT NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuarios(id)
);

CREATE TABLE historial_plantas (
    id SERIAL PRIMARY KEY,
    id_planta INT NOT NULL REFERENCES plantas(id) ON DELETE CASCADE, 
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_estado INT NOT NULL REFERENCES estados(id),
    id_tamanio INT NOT NULL REFERENCES plantas_tamanios(id),
    intervalo_riego_dias INT,
    observaciones TEXT
);
