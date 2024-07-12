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

-- 12/07/2024
CREATE TABLE frequencia(
idFrequencia INT PRIMARY KEY AUTO_INCREMENT,
frequencia ENUM('alta', 'media', 'baixa'), -- O ENUM serve para restringir os valores que virâo como frequência
foreign key (fkUsuario) references usuario(idUsuario)
);

select * from usuario; 
select quiz.certas, quiz.erradas, usuario.nome from quiz
	join usuario
		on fkUsuario = idUsuario;
        
SELECT nome, certas FROM (SELECT nome, certas FROM quiz JOIN usuario ON fkUsuario = idUsuario  ORDER BY certas DESC LIMIT 5) AS Top5 ORDER BY certas ASC;


SELECT nome, certas FROM (SELECT nome, certas, ROW_NUMBER() OVER (PARTITION BY nome ORDER BY certas DESC) AS rn FROM quiz JOIN usuario ON idUsuario = fkUsuario) AS rankeado WHERE rn = 1  ORDER BY certas ASC LIMIT 10;

SELECT 
    usuario.nome, 
    MAX(quiz.certas) AS 'Pontuação'
FROM 
    quiz
JOIN
    usuario ON quiz.fkUsuario = usuario.idUsuario
GROUP BY 
    usuario.nome
ORDER BY 
    Pontuação DESC;

