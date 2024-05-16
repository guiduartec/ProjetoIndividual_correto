CREATE DATABASE ProjetoIndividual;
USE ProjetoIndividual;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100),
senha VARCHAR(100)
);

CREATE TABLE praia(
idPraia INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
localizacao VARCHAR(100),
caracteristicas VARCHAR(100),
avaliacoes INT,
CONSTRAINT chkAvaliacoes CHECK (avaliacoes IN (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
);

CREATE TABLE comentario(
idComentario INT PRIMARY KEY AUTO_INCREMENT,
comentario TEXT,
dtHoraComentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
foreign key (fkUsuario) references usuario(idUsuario)
);

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
tipo_praia VARCHAR(100),
atvPreferida VARCHAR(100),
regiao VARCHAR(100),
fkUsuario INT,
foreign key (fkUsuario) references usuario(idUsuario)
);