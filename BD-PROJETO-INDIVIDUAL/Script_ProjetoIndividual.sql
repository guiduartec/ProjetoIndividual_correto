CREATE DATABASE ProjetoIndividual;
USE ProjetoIndividual;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
email VARCHAR(100),
senha VARCHAR(100)
);

CREATE TABLE quiz(
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
certas INT,
erradas INT,
fkUsuario INT,
foreign key (fkUsuario) references usuario(idUsuario)
);

-- 24/07/2024 --> Criando a tabela que aramazenará as respostas de satisfação dos usuários
CREATE TABLE satisfacao(
idSatisfacao INT PRIMARY KEY AUTO_INCREMENT,
nota INT,
fkUsuario INT,
foreign key (fkUsuario) references usuario(idUsuario)
);

SELECT * FROM satisfacao;

SELECT nota, COUNT(*) AS quantidade
FROM satisfacao
GROUP BY nota;
