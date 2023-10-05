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

DELIMITER //
CREATE TRIGGER generate_token_before_insert
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.token = SUBSTRING(MD5(RAND()), 1, 10);
END;
//
DELIMITER ;

-- Inserir um usuário comprador ativo
INSERT INTO users (nome, email, senha, status, tipo, area_especializacao)
VALUES ('João Silva', 'joao@example.com', 'senha123', 'ativo', 'comprador', 'Tecnologia');

-- Inserir um usuário vendedor ativo
INSERT INTO users (nome, email, senha, status, tipo, area_especializacao)
VALUES ('Maria Santos', 'maria@example.com', 'senha456', 'ativo', 'vendedor', 'Marketing');

-- Inserir um usuário administrador ativo
INSERT INTO users (nome, email, senha, status, tipo, area_especializacao)
VALUES ('Admin', 'admin@example.com', 'admin123', 'ativo', 'administrador', 'administração');

select * from users;