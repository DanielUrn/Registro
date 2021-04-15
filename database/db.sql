CREATE DATABASE registro;
USE registro;

CREATE TABLE usuarios(
    idusuario INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    usuario VARCHAR(20) NOT NULL,
    contrasena VARCHAR(10) NOT NULL
);

CREATE TABLE horarios(
    idhorario INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fentrada DATE NOT NULL,
    fsalida DATE NOT NULL,
    horas INT(2) NOT NULL
);

CREATE TABLE empleados(
    idempleado INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(120),
    correo VARCHAR(30) NOT NULL,
    telefono VARCHAR(15),
    fk_idcargo INT REFERENCES cargos(idcargo)
);

CREATE TABLE departamentos(
    iddepartamento INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    depnombre VARCHAR(20) NOT NULL,
    nempleados INT(4) NOT NULL,
    fk_sucursal INT REFERENCES sucursales(idsucursal)
);

CREATE TABLE cargos(
    idcargo INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cnombre VARCHAR(20) NOT NULL,
    nempleados INT(2) NOT NULL,
    fk_horario INT REFERENCES horarios(idhorario),
    fk_departamento INT REFERENCES departamentos(iddepartamento)
);

CREATE TABLE lista(
    idmov INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fentrada DATE NOT NULL,
    fsalida DATE NOT NULL,
    estado BOOLEAN NOT NULL,
    fk_idempleado INT REFERENCES empleados(idempleado)
);

CREATE TABLE sucursales(
    idsucursal INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    snombre VARCHAR(40) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    nempleados INT(5) NOT NULL
);

-- ENLACES

CREATE TABLE enlaces(
    id INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    usuario_id INT(11),
    created_at timestamp NOT NULL default current_timestamp,
    fk_usuario INT REFERENCES usuario(idusuario)
);
