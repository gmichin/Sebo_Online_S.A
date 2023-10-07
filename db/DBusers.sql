CREATE DATABASE sebo_online;

USE sebo_online;

drop database sebo_online;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL,
    tipo ENUM('comprador', 'vendedor', 'administrador') NOT NULL,
    area_especializacao VARCHAR(255),
    token VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    status ENUM('ativo', 'inativo') NOT NULL,
    tipo ENUM('comprador', 'vendedor', 'administrador') NOT NULL,
    area_especializacao VARCHAR(255),
    token VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	dataInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER generate_token_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.token = SUBSTRING(MD5(RAND()), 1, 10);
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER generate_token_before_insert_admin
BEFORE INSERT ON admin
FOR EACH ROW
BEGIN
    SET NEW.token = SUBSTRING(MD5(RAND()), 1, 10);
END;
//
DELIMITER ;