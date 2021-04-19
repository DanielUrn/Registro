CREATE DATABASE registro;
USE registro;

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
    direccion VARCHAR(200) NOT NULL
);

CREATE TABLE departamentos(
    iddepartamento INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    depnombre VARCHAR(20) NOT NULL,
    sucursal INT(15),
    FOREIGN KEY fk_sucursal(sucursal) REFERENCES sucursales(idsucursal)
);

CREATE TABLE cargos(
    idcargo INT(15) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cnombre VARCHAR(20) NOT NULL,
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
    cargo INT(15),
    FOREIGN KEY fk_cargo(cargo) REFERENCES cargos(idcargo)
);

INSERT INTO sucursales VALUE(1,'Maracaibo','Sabaneta');
INSERT INTO sucursales VALUE(2,'Tucupita','Plaza Bolívar');

INSERT INTO departamentos VALUE (1,'Informática',1);
INSERT INTO departamentos VALUE (2,'Recursos Humanos',1);
INSERT INTO departamentos VALUE (3,'Logística',2);
INSERT INTO departamentos VALUE (4,'Aseo',2);

INSERT INTO cargos VALUE(1,'Ingeniero',1,1);
INSERT INTO cargos VALUE(2,'Psicólogo',1,2);
INSERT INTO cargos VALUE(3,'Ingeniero',4,1);
INSERT INTO cargos VALUE(4,'Estadísta',2,3);
INSERT INTO cargos VALUE(5,'Limpieza',1,4);
INSERT INTO cargos VALUE(6,'Limpieza',2,4);

INSERT INTO empleados VALUE(1,'Rafael Escalona',1,'Maturín','rafaelescalona@gmail.com','414-6980',1);
INSERT INTO empleados VALUE(2,'Isabel',1,'Maracaibo','1252fa@gmail.com','414-6880',2);
INSERT INTO empleados VALUE(3,'Carlos',1,'El bajo','Carlosguerra@gmail.com','414-89540',3);
INSERT INTO empleados VALUE(4,'Carla',1,'La curva','carlaguerra@gmail.com','414-2353531',4);
INSERT INTO empleados VALUE(5,'Galo Shiera',1,'Cabimas','galshiera@gmail.com','414-65162',5);
INSERT INTO empleados VALUE(6,'Jimmy Stavinsky',1,'Pomona','pirata@gmail.com','414-894123',6);