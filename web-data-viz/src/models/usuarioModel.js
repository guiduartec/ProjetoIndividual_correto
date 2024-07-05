var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function jogar_banco(respostasCorretas, respostasIncorretas, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function jogar_banco():", respostasCorretas, respostasIncorretas, idUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quiz (certas, erradas, fkUsuario) VALUES (${respostasCorretas}, ${respostasIncorretas}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
 
function SelectQuiz(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function SelectQuiz(): ", idUsuario)
    var instrucaoSql = `
        SELECT certas, erradas FROM quiz WHERE idQuiz = (SELECT max(idQuiz) FROM quiz WHERE fkUsuario = ${idUsuario} ) GROUP BY idQuiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuiz(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQuiz(): ", idUsuario)
    var instrucaoSql = `
        SELECT certas, erradas FROM quiz WHERE idQuiz = (SELECT max(idQuiz) FROM quiz WHERE fkUsuario = ${idUsuario} ) GROUP BY idQuiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoQuiz(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUltimoQuiz(): ", idUsuario)
    var instrucaoSql = `
        SELECT certas, erradas FROM quiz WHERE idQuiz = (SELECT max(idQuiz) FROM quiz WHERE fkUsuario = ${idUsuario} ) GROUP BY idQuiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



// Função que busca os últimos 5 quizzes de um usuário com base no ID
function buscar5Quiz(idUsuario) {
    // Imprime uma mensagem no console indicando que a função foi acessada
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQuiz(): ", idUsuario);

    // Define a instrução SQL para buscar as últimas 5 tentativas de quiz do usuário, ordenadas por ID em ordem decrescente
    var instrucaoSql = `
        SELECT certas, idQuiz FROM quiz WHERE fkUsuario = ${idUsuario} ORDER BY idQuiz DESC LIMIT 5;
    `;

    // Imprime a instrução SQL que será executada
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a instrução SQL no banco de dados e retorna o resultado
    return database.executar(instrucaoSql);
}

// Função que busca os últimos 5 quizzes de um usuário com base no ID (similar à função anterior) mas atualiza a busca
function buscarUltimos5Quiz(idUsuario) {
    // Imprime uma mensagem no console indicando que a função foi acessada
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUltimoQuiz(): ", idUsuario);

    // Define a instrução SQL para buscar as últimas 5 tentativas de quiz do usuário, ordenadas por ID em ordem decrescente
    var instrucaoSql = `
        SELECT certas, idQuiz FROM quiz WHERE fkUsuario = ${idUsuario} ORDER BY idQuiz DESC LIMIT 5;
    `;

    // Imprime a instrução SQL que será executada
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    // Executa a instrução SQL no banco de dados e retorna o resultado
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    jogar_banco,
    SelectQuiz,
    buscarQuiz,
    buscarUltimoQuiz,
    buscar5Quiz,
    buscarUltimos5Quiz
};