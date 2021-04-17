CREATE DATABASE registro;
USE registro;

CREATE TABLE usuarios(
    idusuario INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    usuario VARCHAR(20) NOT NULL,
    contrasena VARCHAR(10) NOT NULL,
    ingreso   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE horarios(
    idhorario INT(1) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fentrada TIME NOT NULL,
    fsalida TIME NOT NULL,
    horas INT(2) NOT NULL 
);

INSERT INTO horarios VALUE (1,'08:00:00','12:00:00',4);
INSERT INTO horarios VALUE (2,'12:00:00','16:00:00',4);
INSERT INTO horarios VALUE (3,'16:00:00','20:00:00',4);
INSERT INTO horarios VALUE (4,'08:00:00','20:00:00',12);

CREATE TABLE sucursales(
    idsucursal INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    snombre VARCHAR(40) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    nempleados INT(5) NOT NULL
);

CREATE TABLE departamentos(
    iddepartamento INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    depnombre VARCHAR(20) NOT NULL,
    nempleados INT(4) NOT NULL,
    sucursal INT(15),
    FOREIGN KEY fk_sucursal(sucursal) REFERENCES sucursales(idsucursal)
);

CREATE TABLE cargos(
    idcargo INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cnombre VARCHAR(20) NOT NULL,
    nempleados INT(2) NOT NULL,
    horario INT(2),
    departamento INT(15),
    FOREIGN KEY fk_horario(horario) REFERENCES horarios(idhorario),
    FOREIGN KEY fk_departamento(departamento)  REFERENCES departamentos(iddepartamento)
);

CREATE TABLE empleados(
    idempleado INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    cedula INT(13) NOT NULL,
    direccion VARCHAR(120),
    correo VARCHAR(30) NOT NULL,
    telefono VARCHAR(15),
    ingreso   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    editado   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cargo INT(15),
    FOREIGN KEY fk_cargo(cargo) REFERENCES cargos(idcargo)
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
