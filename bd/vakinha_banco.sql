CREATE DATABASE vakinha;
USE vakinha;

CREATE TABLE IF NOT EXISTS perfil(
    id INTEGER AUTO_INCREMENT NOT NULL,
    nome VARCHAR(60) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS usuario(
    id INTEGER AUTO_INCREMENT NOT NULL,
    id_perfil INTEGER NOT NULL,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    senha VARCHAR(128) NOT NULL,
    telefone VARCHAR(13) NOT NULL,
    confirmacao BOOLEAN NOT NULL,
    dois_fatores BOOLEAN NOT NULL,
    data_dois_fatores DATE,
    token VARCHAR(128) UNIQUE,
    PRIMARY KEY(id),
    FOREIGN KEY (id_perfil) REFERENCES perfil(id)
);

CREATE TABLE IF NOT EXISTS campanha(
    id INTEGER AUTO_INCREMENT NOT NULL,
    id_usuario INTEGER NOT NULL,
    nome_usuario VARCHAR(60) NOT NULL,
    nome_campanha VARCHAR(60) NOT NULL UNIQUE,
    valor_objetivo DOUBLE NOT NULL,
    valor_arrecadado DOUBLE NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    aprovacao BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS doacao(
    id_campanha INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
	 valor_doado DOUBLE NOT NULL,
    FOREIGN KEY (id_campanha) REFERENCES campanha(id),
	 FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO perfil(id, nome)
VALUES (NULL, 'Usuário'), (NULL, 'Administrador');