var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        if (resultadoAutenticar.length > 0) {
                            res.json({
                                idUsuario: resultadoAutenticar[0].idUsuario,
                                email: resultadoAutenticar[0].email,
                                nome: resultadoAutenticar[0].nome,
                                senha: resultadoAutenticar[0].senha,
                            });
                        }
                        else {
                            res.status(204).json({ aquarios: [] });
                        }

                    }
                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    }
                    else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Variável que recupera os valores do cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmacaoSenha = req.body.confirmacaoServer;
    var nomecaractere = nome.length;
    var arroba = req.body.emailServer.indexOf('@');
    var ponto = req.body.emailServer.indexOf('.');

    console.log("VALORES RECEBIDOS: ")
    console.log(nome)
    console.log(email)
    console.log(senha)
    console.log(confirmacaoSenha)



    // Validações
    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else if (nomecaractere <= 1) {
        res.status(400).send("Falta um caracter no seu nome!");
    } else if (confirmacaoSenha != senha) {
        res.status(400).send("Senha inválida");
    } else if (arroba < 0) {
        res.status(400).send("Falta um caracter no email");
    } else if (ponto < 0) {
        res.status(400).send("Falta um caracter no email");
    } else if (senha <= 6) {
        res.status(400).send("Senha incompleta");
    }


    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function jogar_banco(req, res) {
    // Variável que recupera os valores do cadastro.html
    var respostasCorretas = req.body.respostasCorretasServer;
    var respostasIncorretas = req.body.respostasIncorretasServer;
    var idUsuario = req.body.idUsuarioServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.jogar_banco(respostasCorretas, respostasIncorretas, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function SelectQuiz(req,res){
    var idUsuario = req.body.idUsuarioServer

    usuarioModel.SelectQuiz(idUsuario)
    .then(
        function (resultadoChamar_Quiz) {

            res.json({
                resultadoChamar_Quiz
            });
}
    )
}

function buscarQuiz(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    const limite_linhas = 1;

    usuarioModel.buscarQuiz(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimoQuiz(req, res) {
    var idUsuario = req.body.idUsuarioServer;

    usuarioModel.buscarUltimoQuiz(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


// function play_banco(req, res) {
//     var respostasCorretas = req.body.respostasCorretasServer;
//     var respostasIncorretas = req.body.respostasIncorretasServer;
//     var idUsuario = req.body.idUsuarioServer;

//         usuarioModel.play_banco(respostasCorretas, respostasIncorretas, idUsuario)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
// }

// function SelectFiveQuiz(req,res){
//     var idUsuario = req.body.idUsuarioServer

//     usuarioModel.SelectFiveQuiz(idUsuario)
//     .then(
//         function (resultadoChamar5_Quiz) {

//             res.json({
//                 resultadoChamar5_Quiz
//             });
// }
//     )
// }


// Função que busca os dados dos últimos 5 quizzes de um usuário com base no ID
function buscar5Quiz(req, res) {
    // Obtém o ID do usuário a partir dos parâmetros da requisição
    var idUsuario = req.params.idUsuarioServer;
    // Define um limite de linhas (não utilizado no código atual)
    const limite_linhas = 1;

    // Chama o método 'buscar5Quiz' do modelo 'usuarioModel' passando o ID do usuário
    usuarioModel.buscar5Quiz(idUsuario).then(function (resultado) {
        // Verifica se o resultado contém dados
        if (resultado.length > 0) {
            // Retorna os dados com status 200 (OK)
            res.status(200).json(resultado);
        } else {
            // Retorna status 204 (No Content) se não houver dados
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        // Em caso de erro na requisição, imprime o erro no console
        console.log(erro);
        // Imprime uma mensagem de erro específica do SQL no console
        console.log("Houve um erro ao buscar.", erro.sqlMessage);
        // Retorna status 500 (Internal Server Error) com a mensagem de erro do SQL
        res.status(500).json(erro.sqlMessage);
    });
}

// Função que busca os dados dos últimos 5 quizzes de um usuário com base no ID
function buscarUltimos5Quiz(req, res) {
    // Obtém o ID do usuário a partir do corpo da requisição
    var idUsuario = req.body.idUsuarioServer;

    // Chama o método 'buscarUltimos5Quiz' do modelo 'usuarioModel' passando o ID do usuário
    usuarioModel.buscarUltimos5Quiz(idUsuario).then(function (resultado) {
        // Verifica se o resultado contém dados
        if (resultado.length > 0) {
            // Retorna os dados com status 200 (OK)
            res.status(200).json(resultado);
        } else {
            // Retorna status 204 (No Content) se não houver dados
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        // Em caso de erro na requisição, imprime o erro no console
        console.log(erro);
        // Imprime uma mensagem de erro específica do SQL no console
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        // Retorna status 500 (Internal Server Error) com a mensagem de erro do SQL
        res.status(500).json(erro.sqlMessage);
    });
}


//Controller p/o Ranking 10/07/2024
function ranking(req, res){
    usuarioModel.ranking()
        .then(
            function(resultado){
                res.json(resultado);
            }
        ).catch(
            function(erro){
                console.log(erro);
                console.log(
                    "\nErro ao achar as pontuações! Erro:",
                    erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    autenticar,
    cadastrar,
    jogar_banco,
    SelectQuiz,
    buscarQuiz,
    buscarUltimoQuiz,
    buscar5Quiz,
    buscarUltimos5Quiz,
    ranking
}